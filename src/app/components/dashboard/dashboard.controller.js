;(function() {
    angular
        .module('dashboard')
        .controller('DashboardController', DashboardController);

    /*ngInject*/
    function DashboardController($scope, $state, dashboardService, accountService, AccountInfo) {

        dashboardService.setOnline(AccountInfo.uid);

        $scope.accountInfo = AccountInfo;
        $scope.userInfo = dashboardService.getUserInfo(AccountInfo.uid);
        $scope.chats = dashboardService.getChats(AccountInfo.uid);
        $scope.users = dashboardService.getUsers();
        $scope.onlineUsers = dashboardService.getOnlineUsers();

        $scope.talkTo = talkTo;
        $scope.signOut = signOut;

        function talkTo(event, uid) {
            event.preventDefault();
            dashboardService.createChat(AccountInfo.uid, uid);
        }

        function signOut() {
            accountService.signOut();
            $state.go('login');
        }
    }
})();