Dim challenge = Await smsFactor.Challenges.AddAsync( _
      New ChallengeCreationOptions() With { _
          .Message = "For the sake of example, your code is ${code}."
})
