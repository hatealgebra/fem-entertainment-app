export const getImdbImage = (imageId: string) => {
  if (!imageId) {
    return "";
  }

  return `https://image.tmdb.org/t/p/original${imageId}`;
};

export const getFlagUrl = (langCode: string) => {
  if (!langCode) {
    return "";
  }

  return `https://flagsapi.com/${langCode}/shiny/64.png`;
};
