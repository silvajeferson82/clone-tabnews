function status(resquest, response) {
  response.status(200).json({ text: 'Connected to API' });
}

export default status;
