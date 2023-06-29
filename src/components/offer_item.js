/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import whiteLogo from "../assets/images/whiteLogo.jpg";
import productImage from "../assets/images/product.jpg";
import dogImage from "../assets/images/do.png";
import pengImage from "../assets/images/pe.png";
import { ArrowLeftCircle, XCircle, ArrowRighttCircle } from "../assets/icons";
import { Modal, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Offer_item = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [images, setImages] = useState([
    whiteLogo,
    productImage,
    pengImage,
    dogImage,
  ]);
  const [imgIndex, setImgIndex] = useState(images.length - 1);
  const [arrowVisibility, setArrowVisibility] = useState(true);
  const [transitionClass, setTransitionClass] = useState("");
  const [carouselClass, setClass] = useState("carousel-images");
  const [dragStartX, setDragStartX] = useState(0);
  const [draggedX, setDraggedX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedClass, setDraggedClass] = useState("");

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const handleImageChangeLeft = () => {
    if (!isDragging) {
      setArrowVisibility(false);
      setImgIndex((prevIndex) => (prevIndex + 1) % images.length);
      setClass("carousel-images-reverse");
    }
  };

  const handleImageChangeRight = () => {
    if (!isDragging) {
      setArrowVisibility(true);
      setImgIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
      setClass("carousel-images-forward");
    }
  };

  const handleImageClick = (index) => {
    setImgIndex(index);
    setOpenModal(true);
  };

  const handleDragStart = (e) => {
    setDragStartX(e.clientX);
    setIsDragging(true);
    setDraggedClass("image-dragged");
  };

  const handleDrag = (e) => {
    if (isDragging) {
      const draggedDistance = e.clientX - dragStartX;
      setDraggedX(draggedDistance);

      if (draggedDistance > 0) {
        setDraggedClass("image-dragged-right");
      } else if (draggedDistance < 0) {
        setDraggedClass("image-dragged-left");
      }
    }
  };
const handleDragEnd = (e) => {
  if (isDragging) {
    const draggedDistance = e.clientX - dragStartX;
    const threshold = 100;
    const maxVisibleImages = 2;

    const maxDragDistance = (images.length - maxVisibleImages) * 100;

    if (draggedDistance > threshold) {
      const clampedDragDistance = Math.min(draggedDistance, maxDragDistance);
      const dragSteps = Math.floor(clampedDragDistance / 100);

      setImgIndex(
        (prevIndex) => (prevIndex - dragSteps + images.length) % images.length
      );
    } else if (draggedDistance < -threshold) {
      const clampedDragDistance = Math.max(draggedDistance, -maxDragDistance);
      const dragSteps = Math.floor(Math.abs(clampedDragDistance) / 100);

      setImgIndex((prevIndex) => (prevIndex + dragSteps) % images.length);
    }

    setDraggedX(0);
    setIsDragging(false);
  }
};

  let imgSrc = images[imgIndex];
  let price = props.price;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className="w-fit bg-[#3A415C] shadow-md rounded-2xl overflow-hidden hover:border-[.7px] cursor-pointer">
      <div className="card-header bg-[#4D546F] flex gap-12 p-[1rem] text-white">
        <p>Time remaining</p>
        <p>2mo:27d:1h</p>
      </div>
      <div className="card-body p-[1rem]">
        <div className="body-title text-[21px] leading-[21px] text-white font-semibold">
          Sneakers available in the store
        </div>
        <div className="display-container flex mt-10 items-center">
          {arrowVisibility && (
            <div
              className="icon cursor-pointer"
              onClick={handleImageChangeLeft}
            >
              <ArrowLeftCircle />
            </div>
          )}
          <div className="mx-auto">
            <div
              className={`image-container flex items-center gap-2`}
              onMouseDown={handleDragStart}
              onMouseMove={handleDrag}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDrag}
              onTouchEnd={handleDragEnd}
              onTouchCancel={handleDragEnd}
              onDragStart={(e) => e.preventDefault()}
            >
              <div className={`${carouselClass} flex gap-2`}>
                {images.map((image, index) => {
                  const isVisible =
                    images.length === 2 ||
                    (index >= imgIndex && index < imgIndex + 2) ||
                    (index <= imgIndex && index > imgIndex - images.length + 2);

                  return (
                    <img
                      key={index}
                      src={image}
                      alt="test"
                      className={`image max-w-[10rem] cursor-pointer h-fit min-h-[7rem] max-h-[8rem] ${
                        imgIndex === index
                          ? "main-image border-2 p-1 active"
                          : ""
                      } ${transitionClass} ${
                        isVisible ? "" : "hidden"
                      } ${draggedClass}`}
                      onClick={() => handleImageClick(index)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          {arrowVisibility === false && (
            <div
              className="icon cursor-pointer"
              onClick={handleImageChangeRight}
            >
              <ArrowRighttCircle />
            </div>
          )}
        </div>
        <Modal
          open={openModal}
          onClose={toggleModal}
          aria-labelledby="image-modal-title"
          className="bg-none"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "none",
              boxShadow: 24,
              p: 4,
              width: isSmallScreen ? "105%" : "70%",
              outline: "none",
              borderRadius: 8,
            }}
          >
            <img
              src={imgSrc}
              alt="test"
              className="max-w-full max-h-[90vh] mx-auto h-fit"
            />
            <div
              className="remove-icon absolute right-0 top-0 cursor-pointer"
              onClick={toggleModal}
            >
              <XCircle />
            </div>
          </Box>
        </Modal>
        <div className="offer flex gap-8 mt-10">
          <p className="text-[14px] leading-[12px] text-[#BEC0C7] mt-1">
            Offer Type
          </p>
          <div className="offers text-[#e9e3e3] text-[14px] font-semibold">
            <div className="flex gap-2 items-center">
              <div className="icons h-2 w-2 rounded-full bg-red-600"></div>
              <div className="different-offers">Buy All Offer</div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="icons h-2 w-2 rounded-full bg-[#787e97]"></div>
              <div className="different-offers">Open Stock</div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="icons h-2 w-2 rounded-full bg-yellow-300"></div>
              <div className="different-offers">Orders Pending</div>
            </div>
          </div>
          <div className="desc-offers flex flex-col gap-2">
            <div className="text-[14px] leading-[12px] text-[#BEC0C7] flex justify-between gap-3 items-center">
              Total Quantity{" "}
              <span className="text-[#e9e3e3] text-[14px] font-semibold">
                7
              </span>
            </div>
            <div className="text-[14px] leading-[12px] text-[#BEC0C7] flex justify-between items-center">
              Min Quantity{" "}
              <span className="text-[#e9e3e3] text-[14px] font-semibold">
                3
              </span>
            </div>
          </div>
        </div>
        <div className="shipping flex mt-4 items-center gap-2">
          <p className="text-[14px] leading-[12px] text-[#BEC0C7]">
            Shipping Time
          </p>
          <p className="text-[#e9e3e3] text-[14px] font-semibold">
            1 Business Day
          </p>
        </div>
        <div className="models flex items-center gap-4 mt-1">
          <p className="text-[14px] leading-[12px] text-[#BEC0C7]">
            Total Models
          </p>
          <p className="text-[#e9e3e3] text-[14px] font-semibold">2</p>
        </div>
        <div className="gender mt-3 mb-4 flex gap-6">
          <p className="text-[14px] leading-[12px] text-[#BEC0C7]">Gender</p>
          <div className="choose-gender flex gap-4">
            <div className="text-white text-[12px] font-semibold bg-[#BEC0C7] px-2 rounded-xl py-1 w-fit text-center">
              Men
            </div>
            <div className="text-white text-[12px] font-semibold bg-[#BEC0C7] px-2 rounded-xl py-1 w-fit text-center">
              Woman
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer_item;
