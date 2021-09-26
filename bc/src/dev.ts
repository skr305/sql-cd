import app from './bootstrap';

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
