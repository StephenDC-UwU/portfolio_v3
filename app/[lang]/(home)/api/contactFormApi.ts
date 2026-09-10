import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_CONTACT_API_URL;

export const contactFormApi = axios.create({
  baseURL: `https://formspree.io/f/${BASE_URL}`,
});
