import * as React from "react";
import * as VSS from "VSS/VSS";

/** Given the imported modules (in the order given in the modules array), return the type of the component to create */
export type ModuleComponentSelector<TProps> = (...modules: any[]) => React.ComponentClass<TProps> | React.StatelessComponent<TProps>;

interface IAsyncLoadedComponentProps<TProps> {
    /** Paths of modules to be loaded */
    modules: string[];

    /** Selector for type */
    moduleComponentSelector: ModuleComponentSelector<TProps>;

    /** Optional alternative component to show while loading */
    componentWhileLoading?: () => JSX.Element;

    /** Optional callback for call before the loading of the component starts */
    onLoadStart?: () => void;

    /** Optional callback for call after the loading of the component ends */
    onLoadEnd?: () => void;

    /** Properties to pass to delay loaded component */
    props: TProps;
}

interface IAsyncLoadedComponentState<TProps> {
    /** Value determining whether modules are already being requested */
    isLoading: boolean;

    /** Type of the component to be created */
    componentType: React.ComponentClass<TProps> | React.StatelessComponent<TProps>;
}

class AsyncLoadedComponent<TProps>
    extends React.Component<IAsyncLoadedComponentProps<TProps>, IAsyncLoadedComponentState<TProps>> {
    private _isMounted: boolean = false;

    constructor(props?: IAsyncLoadedComponentProps<TProps>, context?: any) {
        super(props, context);

        this.state = {
            isLoading: false,
            componentType: null
        };
    }

    public render(): JSX.Element {
        if (!this.state.componentType) {
            // Component has not been loaded yet
            if (this.props.componentWhileLoading) {
                // Display alternative component while loading 
                return this.props.componentWhileLoading();
            }

            // Display nothing
            return null;
        }
        
        return React.createElement(this.state.componentType as React.StatelessComponent<TProps>, this.props.props);
    }

    public componentWillMount(): void {
        if (this.props.onLoadStart) {
            this.props.onLoadStart();
        }
    }

    public componentDidMount(): void {
        this._isMounted = true;

        if (!this.state.componentType && !this.state.isLoading) {
            this.setState({
                isLoading: true,
                componentType: null
            });

            VSS.using(this.props.modules, (...modules) => {
                if (this._isMounted) {
                    if (this.props.onLoadEnd) {
                        this.props.onLoadEnd();
                    }

                    this.setState({
                        isLoading: false,
                        componentType: this.props.moduleComponentSelector(...modules)
                    });
                }
            });
        }
    }

    public componentWillUnmount(): void {
        if (this.state.isLoading) {
            this.setState({
                isLoading: false,
                componentType: null
            });
        }

        this._isMounted = false;
    }
}

/**
 * Create a method returning a delay loaded component instance
 * @param modules Paths of modules to load
 * @param moduleComponentSelector Selector function, given the imported modules to return the type/constructor method to create
 *                                the desired component.
 * @param componentWhileLoading Optional function to return a component to display while loading
 * @param onLoadStart Optional callback function that will be called once the component async load starts
 * @param onLoadEnd Optional callback function that will be called once the component async load ends
 */
export function getAsyncLoadedComponent<TProps = {}>
    (modules: string[],
    moduleComponentSelector: ModuleComponentSelector<TProps>,
    componentWhileLoading?: () => JSX.Element,
    onLoadStart?: () => void,
    onLoadEnd?: () => void): (props: TProps) => JSX.Element {

    return (props: TProps) => React.createElement(
        AsyncLoadedComponent,
        {
            modules,
            moduleComponentSelector,
            componentWhileLoading,
            onLoadStart,
            onLoadEnd,
            props,
        } as IAsyncLoadedComponentProps<TProps>);
}