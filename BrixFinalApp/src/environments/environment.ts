// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  registerRoute:"http://localhost:58427/api/Login/register",
  loginRoute: "http://localhost:58427/api/Login/login",
  getAccountRoute: "http://localhost:58427/api/Account/GetAccountInfo?accountId=",
  createTransactionRoute:"http://localhost:51125/api/Transaction/transaction",
  getOperationsList:"http://localhost:58427/api/OperationHistory/GetAccountHistory?",
  getTransactionDetails:"http://localhost:51125/api/TransactionInfo/transactionInfo?transactionId=",
  getFilterTransactionsList:"http://localhost:58427/api/OperationHistory/GetAccountHistory?",
  postToVerifyMail:"http://localhost:58427/api/Login/sendEmail"

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
