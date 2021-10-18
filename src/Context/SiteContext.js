import React, { createContext, useState } from "react";

export const SiteContext = createContext();
export const AboutPageContext = createContext();
export const PackagePageContext = createContext();
export const GalleryPageContext = createContext();
export const BookingInquiries = createContext();
export const TemplatePageContext = createContext();

export const SiteProvider = ({ children }) => {
  const [aboutPage, setAboutPage] = useState(null);
  const [packagePage, setPackpage] = useState(null);
  const [packages, setPackages] = useState([]);
  const [galleryPage, setGalleryPage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [bookingInquiries, setBookingInquiries] = useState([]);
  const [templatePage, setTemplatePage] = useState(null);
  const [templates, setTemplates] = useState([]);

  const [loading, setLoading] = useState({
    isLoading: false,
    message: "",
    status: null,
  });

  const resetLoading = () =>
    setLoading({ loading: false, message: "", status: null });

  const loadStateData = (type, payload) => {
    switch (type) {
      case "ABOUT_PAGE":
        return setAboutPage(payload);
      case "PACKAGE_PRICING_PAGE":
        return setPackpage(payload);
      case "PACKAGES":
        return setPackages(payload);
      case "CREATE_PACKAGE":
        return setPackages([...packages].concat(payload));
      case "UPDATE_PACKAGE":
        const stalePackage = packages.findIndex((el) => el.id === payload.id);
        packages[stalePackage] = payload;
        return setPackages([...packages]);
      case "DELETE_PACKAGE":
        //the payload here is just the ID of the deleted record
        return setPackages([...packages.filter((item) => item.id !== payload)]);
      case "GALLERY_PAGE":
        setGalleryPage(payload);
        if (payload.images) {
          setGalleryImages([...galleryImages, ...payload.images]);
        }
        return;
      case "CREATE_GALLERY_IMAGES":
        return setGalleryImages(payload);
      case "DELETE_GALLERY_IMAGE":
        const remainingImages = galleryImages.filter(
          ({ id }) => id !== payload
        );
        return setGalleryImages(remainingImages);
      case "DELETE_ALL_GALLERY_IMAGES":
        return setGalleryImages([]);

      case "BOOKING_INQUIRIES":
        return setBookingInquiries(payload);
      case "ACCEPT_BOOKING":
        const upDatedArray = bookingInquiries.filter(
          (inquiry) => inquiry.id !== payload.id
        );
        return setBookingInquiries(upDatedArray);
      case "TEMPLATE_PAGE":
        return setTemplatePage(payload);
      case "TEMPLATES":
        return setTemplates(payload);
      case "UPDATE_TEMPLATE":
        const templateToBeUpdated = templates.findIndex(
          (el) => el.id === payload.id
        );
        templates[templateToBeUpdated] = payload;
        return setTemplates([...templates]);
      case "CREATE_TEMPLATE":
        return setTemplates([...templates].concat(payload));
      case "DELETE_TEMPLATE":
        return setTemplates(
          templates.filter((template) => template.id !== payload)
        );
      case "SUCCESS":
        return setLoading({
          isLoading: true,
          status: "success",
          message: payload,
        });
      case "ERROR":
        return setLoading({
          isLoading: true,
          status: "failed",
          message: payload,
        });
      default:
        return null;
    }
  };

  return (
    <SiteContext.Provider value={[loadStateData, loading, resetLoading]}>
      <AboutPageContext.Provider value={[aboutPage]}>
        <PackagePageContext.Provider value={[packagePage, packages]}>
          <GalleryPageContext.Provider value={[galleryPage, galleryImages]}>
            <BookingInquiries.Provider value={[bookingInquiries]}>
              <TemplatePageContext.Provider value={[templatePage, templates]}>
                {children}
              </TemplatePageContext.Provider>
            </BookingInquiries.Provider>
          </GalleryPageContext.Provider>
        </PackagePageContext.Provider>
      </AboutPageContext.Provider>
    </SiteContext.Provider>
  );
};
