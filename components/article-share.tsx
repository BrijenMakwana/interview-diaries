"use client";

import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Button } from "@nextui-org/button";
import { FC } from "react";
import { BsShare } from "react-icons/bs";
import { HiOutlineLink } from "react-icons/hi";
import { toast } from "react-toastify";

interface IArticleShare {
  articleUrl: string;
}

const ICON_SIZE = 38;

const ArticleShare: FC<IArticleShare> = (props) => {
  const { articleUrl } = props;

  const shareableUrl = window.location.origin + articleUrl;

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(shareableUrl);

    toast.success("Link copied to clipboard!");
  };

  return (
    <Popover placement="top">
      <PopoverTrigger>
        <Button variant="flat" isIconOnly>
          <BsShare />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-row items-center justify-center px-1 py-2 gap-3 flex-wrap">
          <Button
            variant="flat"
            isIconOnly
            className="rounded-full"
            onClick={copyLinkToClipboard}
          >
            <HiOutlineLink size={20} />
          </Button>

          <TwitterShareButton url={shareableUrl}>
            <TwitterIcon round size={ICON_SIZE} />
          </TwitterShareButton>

          <RedditShareButton url={shareableUrl}>
            <RedditIcon round size={ICON_SIZE} />
          </RedditShareButton>

          <LinkedinShareButton url={shareableUrl}>
            <LinkedinIcon round size={ICON_SIZE} />
          </LinkedinShareButton>

          <FacebookShareButton url={shareableUrl}>
            <FacebookIcon round size={ICON_SIZE} />
          </FacebookShareButton>

          <WhatsappShareButton url={shareableUrl}>
            <WhatsappIcon round size={ICON_SIZE} />
          </WhatsappShareButton>

          <TelegramShareButton url={shareableUrl}>
            <TelegramIcon round size={ICON_SIZE} />
          </TelegramShareButton>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ArticleShare;
