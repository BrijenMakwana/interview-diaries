import { FC } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import SectionHeading from "./section-heading";
import Article, { IArticle } from "./article";

interface IPreviewArticle extends IArticle {
  company: string;
  isOpen: boolean;
  onOpenChange: () => void;
}

const PreviewArticle: FC<IPreviewArticle> = (props) => {
  const {
    isOpen,
    onOpenChange,
    company,
    selected,
    mode,
    rounds,
    interviewDate,
    content,
  } = props;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="full"
      scrollBehavior="outside"
      isDismissable={false}
      className="flex flex-col items-center z-50 p-5 h-fit min-h-[100vh]"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <SectionHeading
                text="interview experience for"
                highlightedText={company}
              />
            </ModalHeader>
            <ModalBody className="scroll-auto">
              <Article
                selected={selected}
                mode={mode}
                rounds={rounds}
                interviewDate={interviewDate}
                content={content}
              />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PreviewArticle;
