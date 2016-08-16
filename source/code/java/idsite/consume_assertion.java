// req is an HttpServletRequest
AccountResult accountResult = application
    .newIdSiteCallbackHandler(req)
    .getAccountResult();
