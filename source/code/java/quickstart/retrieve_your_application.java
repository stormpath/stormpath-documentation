Application application = client
  .getApplications(Applications.where(Applications.name().eqIgnoreCase("My Application")))
  .single();
