import React from "react";
import { Link } from "react-router-dom";
import Icons from "../../../components/icon";
import { ButtonGhost } from "../../../components/button/ButtonCustom";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaTiktok,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineGlobal } from "react-icons/ai";
import { PiPersonArmsSpreadFill } from "react-icons/pi";

const dataFooter = [
  {
    title: "Categories",
    data: [
      {
        title: "Graphics & Design",
      },
      {
        title: "Digital Marketing",
      },
      {
        title: "Writing & Translation",
      },
      {
        title: "Video & Animation",
      },
      {
        title: "Music & Audio",
      },
      {
        title: "Programming & Tech",
      },
      {
        title: "AI Services",
      },
      {
        title: "Data",
      },
      {
        title: "Business",
      },
      {
        title: "Personal Growth & Hobbies",
      },
      {
        title: "Photography",
      },
      {
        title: "Finance",
      },
      {
        title: "End-to-End Projects",
      },
      {
        title: "Service Catalog",
      },
    ],
  },
  {
    title: "For Clients",
    data: [
      {
        title: "How Fiverr Works",
      },
      {
        title: "Customer Success Stories",
      },
      {
        title: "Trust & Safety",
      },
      {
        title: "Quality Guide",
      },
      {
        title: "Fiverr Learn",
        subtitle: "Online Courses",
      },
      {
        title: "Fiverr Guides",
      },
      {
        title: "Fiverr Answers",
      },
    ],
  },
  {
    title: "For Freelancers",
    data: [
      {
        title: "Become a Fiverr Freelancer",
      },
      {
        title: "Become an Agency",
      },
      {
        title: "Kickstart",
      },
      {
        title: "Community Hub",
      },
      {
        title: "Forum",
      },
      {
        title: "Events",
      },
    ],
  },
  {
    title: "Business Solutions",
    data: [
      {
        title: "Fiverr Pro",
      },
      {
        title: "Project Management Service",
      },
      {
        title: "ClearVoice",
        subtitle: "Content Marketing",
      },
      {
        title: "Working Not Working",
        subtitle: "Creative Talent",
      },
      {
        title: "AutoDS",
        subtitle: "Dropshipping Tool",
      },
      {
        title: "Fiverr Logo Maker",
      },
      {
        title: "Contact Sales",
      },
    ],
  },
  {
    title: "Company",
    data: [
      {
        title: "About Fiverr",
      },
      {
        title: "Help & Support",
      },
      {
        title: "Social Impact",
      },
      {
        title: "Careers",
      },
      {
        title: "Terms of Service",
      },
      {
        title: "Privacy Policy",
      },
      {
        title: "Partnerships",
      },
      {
        title: "Creator Network",
      },
      {
        title: "Affiliates",
      },
      {
        title: "Invite a Friend",
      },
      {
        title: "Press & News",
      },
      {
        title: "Investor Relations",
      },
    ],
  },
];
const dataSocials = [
  {
    icon: <FaTiktok />,
  },
  {
    icon: <FaInstagram />,
  },
  {
    icon: <FaLinkedin />,
  },
  {
    icon: <FaFacebook />,
  },
  {
    icon: <FaPinterest />,
  },
  {
    icon: <FaXTwitter />,
  },
];

const FooterTemplate = () => {
  return (
    <footer className="border border-t-gray-200">
      <div className="container py-10">
        <div className="grid grid-cols-5">
          {dataFooter.map((item, index) => {
            return (
              <div key={index} className="space-y-5">
                <h2 className="font-semibold">{item.title}</h2>
                <ul className="space-y-5">
                  {item.data.map((item, index) => {
                    return (
                      <li key={index}>
                        <Link className="text-[#74767e] hover:underline transition-all duration-200">
                          {item.title}
                          {item.subtitle && (
                            <p className="text-[#b5b6ba] text-sm">
                              {item.subtitle}
                            </p>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
      <div className="container border-t border-t-gray-200 p-4 flex justify-between">
        <div className="flex items-center space-x-6">
          <Icons.logoR />
          <span className="text-sm text-[#b5b6ba]">
            © Fiverr International Ltd. 2024
          </span>
        </div>
        <div>
          <ul className="flex space-x-2">
            {dataSocials.map((item, index) => {
              return (
                <li key={index}>
                  <ButtonGhost
                    icon={item.icon}
                    className="text-xl text-[#74767e] hover:text-[#74767e] hover:bg-[#DBDBDD] !rounded-full !p-2"
                  />
                </li>
              );
            })}
            <ButtonGhost
              icon={<AiOutlineGlobal />}
              content={"English"}
              className={
                "text-[#74767e] hover:text-blackSecond hover:bg-[#DBDBDD] rounded-3xl text-sm font-semibold transition-all duration-300"
              }
            />
            <ButtonGhost
              content="US$ USD"
              className={
                "text-[#74767e] hover:text-blackSecond hover:bg-[#DBDBDD] rounded-3xl text-sm font-semibold transition-all duration-300"
              }
            />
            <ButtonGhost
              icon={<PiPersonArmsSpreadFill />}
              className="text-xl text-[#74767e] hover:text-[#74767e] hover:bg-[#DBDBDD] !rounded-full !p-3"
            />
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default FooterTemplate;
