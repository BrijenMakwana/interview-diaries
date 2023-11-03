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

interface IArticleShare {
  articleUrl: string;
}

const ICON_SIZE = 40;

const ArticleShare: FC<IArticleShare> = (props) => {
  const { articleUrl } = props;

  return (
    <Popover placement="top">
      <PopoverTrigger>
        <Button startContent={<BsShare />} variant="flat">
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-row items-center justify-center px-1 py-2 gap-3">
          <TwitterShareButton url={articleUrl}>
            <TwitterIcon round size={ICON_SIZE} />
          </TwitterShareButton>

          <RedditShareButton url={articleUrl}>
            <RedditIcon round size={ICON_SIZE} />
          </RedditShareButton>

          <LinkedinShareButton url={articleUrl}>
            <LinkedinIcon round size={ICON_SIZE} />
          </LinkedinShareButton>

          <FacebookShareButton url={articleUrl}>
            <FacebookIcon round size={ICON_SIZE} />
          </FacebookShareButton>

          <WhatsappShareButton url={articleUrl}>
            <WhatsappIcon round size={ICON_SIZE} />
          </WhatsappShareButton>

          <TelegramShareButton url={articleUrl}>
            <TelegramIcon round size={ICON_SIZE} />
          </TelegramShareButton>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ArticleShare;
