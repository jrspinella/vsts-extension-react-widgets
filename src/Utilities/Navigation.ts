import { HostNavigationService } from "VSS/SDK/Services/Navigation";

export module NavigationUtils {
    var navigationService: HostNavigationService;

    async function getNavigationService(): Promise<HostNavigationService> {
        if (!navigationService) {
            navigationService = await VSS.getService(VSS.ServiceIds.Navigation) as HostNavigationService; 
        }

        return navigationService;
    }

    export async function navigate(data?: IDictionaryStringTo<any>, replaceHistoryEntry?: boolean, mergeWithCurrentState?: boolean, windowTitle?: string, suppressNavigate?: boolean) {
        const navigationService = await getNavigationService();
        navigationService.updateHistoryEntry(null, data, replaceHistoryEntry, mergeWithCurrentState, windowTitle, suppressNavigate);
    }
}