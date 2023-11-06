import Api from "./setupAxios";

export function api_login(data) {
  return Api().post("login", data);
}

export function api_upload_image(data) {
  return Api().post("admin/upload", data);
}

export function api_get_home_page() {
  return Api().get("admin/pages/home");
}

export function api_update_home_page(data) {
  return Api().put("admin/pages/home", data);
}

export function api_get_all_pages() {
  return Api().get("admin/pages");
}

export function api_update_header_page(data) {
  return Api().put("admin/pages/header", data);
}

export function api_get_header_page() {
  return Api().get("admin/pages/header");
}

export function api_update_footer_page(data) {
  return Api().put("admin/pages/footer", data);
}

export function api_get_footer_page() {
  return Api().get("admin/pages/footer");
}

export function api_get_messages() {
  return Api().get("admin/contact");
}
