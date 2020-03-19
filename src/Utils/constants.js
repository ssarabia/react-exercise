export const getProfileUrl = username =>
  `https://api.github.com/users/${username}`;

export const getReposUrl = username =>
  `https://api.github.com/users/${username}/repos?sort=created&direction=desc`;
