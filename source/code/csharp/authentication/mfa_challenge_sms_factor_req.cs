var challenge = await smsFactor.Challenges.AddAsync(
    new ChallengeCreationOptions()
{
    Message = "For the sake of example, your code is ${code}."
});
