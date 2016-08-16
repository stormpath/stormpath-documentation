import java.util.*;

application.setAuthorizedCallbackUris(
  Arrays.asList(
    "https://myapplication.com/whatever/callback",
    "https://myapplication.com/whatever/callback2"
  )
);

application.save();
