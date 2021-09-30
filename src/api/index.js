import axios from "axios";

// Set config defaults when creating the instance
const api = axios.create({
  baseURL: "https://floating-plains-85977.herokuapp.com",
});

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Token token=${token}`;

  return config;
});

export const getAboutPage = async () => {
  const response = await api.get("/about_page");

  return response.data.about_page;
};

export const getPackagePage = async () => {
  const response = await api.get("/package_page");

  return response.data.package_page;
};

export const getPricingPackages = async () => {
  const response = await api.get("/packages");

  return response.data.packages;
};

export const getGalleryPage = async () => {
  const response = await api.get("/gallery_page");

  return response.data.gallery;
};

export const getBookingInquiries = async (critera) => {
  const response = await api.get("/booking_requests", {
    params: {
      sort: critera,
    },
  });

  return response.data.booking_requests;
};

export const getTemplatePage = async () => {
  const response = await api.get("/template_page");
  console.log("TEMPLATE PAGE", response.data);
  return response.data.template_page;
};

export const getTemplates = async (frontPageOnly) => {
  const response = await api.get(`/templates`, {
    params: {
      frontPageOnly: frontPageOnly,
    },
  });

  return response.data.templates;
};

export const acceptBooking = async (id) => {
  const response = await api.patch(`/booking_requests/${id}`, {
    booking_request: { booked: true },
  });
  return response.data.booking_request;
};

export const removeBooking = async (id) => {
  const response = await api.patch(`/booking_requests/${id}`, {
    booking_request: { remove: true },
  });
  return response.data.booking_request;
};

// export const removeBooking = async (id) => {
//   const response = await api.patch(`/booking_requests/${id}`, {
//     params: {
//       remove: true,
//     },
//   });
//   return response.data.booking_request;
// };

export const updateAboutPage = async (form) => {
  const response = await api.patch("/about_page", { about_page: form });
  return response.data.about_page;
};

export const updatePackagePage = async (form) => {
  const response = await api.patch("/package_page", { package_page: form });
  return response.data.package_page;
};

export const uploadAboutPageImage = async (form) => {
  let about_page = JSON.stringify(form);

  const response = await api.patch("/about_page", form);

  return response.data.about_page;
};

export const updateGalleryPage = async (gallery) => {
  const response = await api.patch("/gallery_page", { gallery });
  return response.data.gallery;
};

export const updateTemplatePage = async (data) => {
  const response = await api.patch("/template_page", { template_page: data });
  console.log("TEMPLATE PAGE", response.data.template_page);

  return response.data.template_page;
};

export const uploadGalleryImages = async (form) => {
  const response = await api.patch("/gallery_page/upload_pic", form, {
    headers: {
      contentType: false,
    },
  });

  return response.data.gallery.images;
};

export const createPackage = async (form) => {
  const response = await api.post("/packages", { package: form });
  return response.data.package;
};

export const createTemplate = async (template) => {
  const response = await api.post("/templates", template);

  return response.data.template;
};

export const createBookingRequest = async (form) => {
  const response = await api.post("/booking_requests", {
    booking_request: form,
  });
  return response.data.booking_request;
};

export const deletePackage = async (id) => {
  const response = await api.delete(`/packages/${id}`);

  return id;
};

export const deleteTemplate = async (id) => {
  const response = await api.delete(`/templates/${id}`);

  return id;
};

export const deleteGalleryImage = async (id) => {
  const response = await api.delete(`/gallery_page/delete_pic/${id}`);
  return id;
};

export const deleteAllGalleryImages = async () => {
  const response = await api.delete(`/gallery_page/delete_pics`);
  return [];
};

export const signIn = async (credentials) => {
  console.log("SIGN IN");
  const response = await api.post("/sign-in", { credentials });
  return response.data.user;
};
