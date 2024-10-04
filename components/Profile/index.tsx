import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { useSession } from 'next-auth/react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import ConvertCoin from '../ConvertCoin';
import Link from 'next/link';
import { XMarkIcon } from "@heroicons/react/16/solid";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Profile() {
  const { data: session } = useSession() || {};
  const [selectedNFT, setSelectedNFT] = useState({
    id: 1,
    title: 'NFT 1',
    image: 'https://th.bing.com/th/id/OIP.9epyABsKLdxw0h4-X68oewHaHa?rs=1&pid=ImgDetMain',
    owner: 'John Doe',
    description: 'This is certificate for joining the champions',
    price: 100,
  });
  const { isOpen: isNFTOpen, onOpen: onNFTOpen, onClose: onNFTClose } = useDisclosure();

  function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, color: "orange" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, color: "orange" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    dots: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerPadding: "40px",
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "100px",
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: "50px",
        }
      }
    ]
  };

  const ListNFT = [
    {
      tx_hash: '6084919291',
      title: 'NFT 1',
      image: 'https://th.bing.com/th/id/OIP.9epyABsKLdxw0h4-X68oewHaHa?rs=1&pid=ImgDetMain',
      owner: 'John Doe',
      description: 'This is certificate for joining the champions',
      price: 100,
    },
    {
      tx_hash: '6084919274',
      title: 'NFT 2',
      image: 'https://th.bing.com/th/id/OIP.9epyABsKLdxw0h4-X68oewHaHa?rs=1&pid=ImgDetMain',
      owner: 'Jane Doe',
      description: 'This is certificate for joining the champions',
      price: 50,
    },
    {
      tx_hash: '6084919269',
      title: 'NFT 3',
      image: 'https://th.bing.com/th/id/OIP.9epyABsKLdxw0h4-X68oewHaHa?rs=1&pid=ImgDetMain',
      owner: 'Mike Doe',
      description: 'This is certificate for joining the champions',
      price: 150,
    }
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpen = () => {
    onOpen();
  }

  const handleNFTOpen = (nft: any) => {
    // setSelectedNFT(nft);
    // onNFTOpen();
    window.open(`https://explorer.aptoslabs.com/txn/${nft.tx_hash}?network=testnet`, "_self")
  }

  return (
    <>
      <div className="bg-background text-primary-foreground min-h-screen">
        <div className="max-w-4xl mx-auto p-4">
          <div className="absolute top-4 right-4 z-10">
            <Link href="/" className="text-white hover:text-gray-300">
              <XMarkIcon className="h-6 w-6" />
            </Link>
          </div>
          <div className="bg-card rounded-lg p-4 mb-4">
            <div className="flex items-center mb-4">
              <img className="w-16 h-16 rounded-full mr-4" src={session?.user?.image ?? "/path/to/default/image.jpg"} alt="User Avatar" />
              <div>
                <h2 className="text-lg font-bold">{session?.user?.name}</h2>
                <p className="text-sm text-muted">{session?.user?.email}</p>
              </div>
            </div>
            <p className="text-sm text-secondary">No pain no gain!</p>
          </div>

          <div className="bg-card rounded-lg p-4 mt-4">
            <h2 className="text-lg font-bold mb-2">Balance Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-200 text-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-bold mb-1">Total Balance</h3>
                <p className="text-sm mb-2">100.00$</p>
              </div>
              <div className="bg-gray-200 text-gray-800 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold">APT</h3>
                  <Button className="text-tiny" color="primary" radius="full" size="sm" onPress={() => handleOpen()}>
                    Convert
                  </Button>
                </div>
                <p className="text-sm mb-2">2500</p>
                <p className="text-sm mb-2">$120</p>
              </div>
              <div className="bg-gray-200 text-gray-800 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold">BTC</h3>
                  <Button className="text-tiny" color="primary" radius="full" size="sm" onPress={() => handleOpen()}>
                    Convert
                  </Button>
                </div>
                <p className="text-sm mb-2">0.000128</p>
                <p className="text-sm mb-2">$1300</p>
              </div>
            </div>
          </div>

          <Slider {...settings}>
            {ListNFT.map(item => (
              <div key={item.tx_hash} className="px-2">
                <Card isFooterBlurred className="py-4">
                  <CardHeader className="absolute z-10 top-1 flex-col items-start">
                    <p className="text-tiny text-white/60 uppercase font-bold">{item.owner}</p>
                    <h4 className="text-gray/60 font-medium text-2xl">{item.title}</h4>
                  </CardHeader>
                  <Image
                    removeWrapper
                    alt="Card example background"
                    className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                    src={item.image}
                  />
                  <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                    <div>
                      <p className="text-black text-tiny">{item.description}</p>
                      <p className="text-black text-tiny">${item.price}</p>
                    </div>
                    <Button className="text-tiny" color="primary" radius="full" size="sm" onPress={() => handleNFTOpen(item)}>
                      View NFT
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <Modal
        size="full"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Convert Assets</ModalHeader>
              <ModalBody>
                <ConvertCoin />
              </ModalBody>
              {/* <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={isNFTOpen} onClose={onNFTClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{selectedNFT?.title}</ModalHeader>
              <ModalBody>
                <Image
                  src={selectedNFT?.image}
                  alt={selectedNFT?.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <p className="mt-4"><strong>Owner:</strong> {selectedNFT?.owner}</p>
                <p><strong>Description:</strong> {selectedNFT?.description}</p>
                <p><strong>Price:</strong> ${selectedNFT?.price}</p>
              </ModalBody>
              <ModalFooter>
                {/* <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button> */}
                <Button color="primary" onPress={onClose}>
                  Update NFT
                </Button>
                <Button color="primary" onPress={onClose}>
                  Burn NFT
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>

  );
}