import { passportAuth } from "@blitzjs/auth"
import { api } from "src/blitz-server"
import db from "db"
// https://www.passportjs.org/packages/passport-github2/
import passportGithub2 from "passport-github2"

export default api(
  passportAuth(({ ctx, req, res }) => ({
    successRedirectUrl: "/",
    errorRedirectUrl: "/",
    strategies: [
      {
        // see also
        // https://github.com/libscie/ResearchEquals.com/blob/main/pages/api/auth/%5B...auth%5D.ts
        strategy: new passportGithub2(
          {
            clientID: "3e4e9e61f94a55e5ca05",
            clientSecret: "c9b16215f45f816300176519f28a4c58ee573e39",
            callbackURL: "http://localhost:3000/api/auth/github/callback",
          },
          function (accessToken, refreshToken, profile, done) {
            console.log(profile)
          }
        ), // Provide initialized passport strategy here
      },
    ],
  }))
)
