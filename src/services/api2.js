const apiRecebe = async () => {
  const linkApi = await fetch('https://economia.awesomeapi.com.br/json/all');
  const requisicao = await linkApi.json();
  delete requisicao.USDT;
  return requisicao;
};

export default apiRecebe;
