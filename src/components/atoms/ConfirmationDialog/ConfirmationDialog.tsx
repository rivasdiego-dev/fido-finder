import { FC } from 'react';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";


interface ConfirmationModalProps {
    isOpen: boolean;
    modalTitle: string;
    modalBody: string;
    onOpenChange: (isOpen: boolean) => void;
    onConfirm: () => void;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({ isOpen, onOpenChange, onConfirm, modalTitle, modalBody }) => {

    return (
        <Modal backdrop='blur' placement='center' size='sm' isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 font-quicksand font-bold">
                            <h3>{modalTitle}</h3>
                        </ModalHeader>
                        <ModalBody>
                            <p className='font-roboto text-justify'>
                                {modalBody}
                            </p>
                        </ModalBody>
                        <ModalFooter className='justify-evenly'>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Cancelar
                            </Button>
                            <Button color="primary" onPress={() => { onConfirm(); onClose(); }}>
                                OK
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ConfirmationModal;