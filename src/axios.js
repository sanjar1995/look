import axios from "axios";

const baseUrl = "https://api.sievesapp.com/v1/public";
const spaceUrl = "https://sieveserp.ams3.cdn.digitaloceanspaces.com";
const loookUrl = "https://loooknet.uz/index.php";
const telegramUrl =
  "https://api.sievesapp.com/v1/public/make-post?chat_id=-1001388814073";
const telegramDebUrl =
  "https://api.sievesapp.com/v1/public/make-post?chat_id=-1002074915184";

const instance = axios.create({
  baseURL: baseUrl,
});

const instance_two = axios.create({
  baseURL: spaceUrl,
});
const instance_three = axios.create({
  baseURL: loookUrl,
});

export { instance, instance_two, instance_three, telegramUrl, telegramDebUrl };
