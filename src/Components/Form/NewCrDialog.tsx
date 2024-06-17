import { Dialog } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { useId } from '@kinvolk/headlamp-plugin/lib/util';
import React, { useState } from 'react';
import CRD from '@kinvolk/headlamp-plugin/lib/K8s/crd';
import { CustomResourceForm } from './CrCreationForm';

function onClose() {
  console.log('Close dialog');
}

interface NewCrDialogProps {
  open: boolean;
  onClose: () => void;
  crd: CRD;
}
export function NewCrDialog({ open, onClose, crd }: NewCrDialogProps) {
  //const dialogTitleId = useId('editor-dialog-title-');
  return (
    <Dialog
      title={'New Custom Resource'}
      aria-busy={true}
      maxWidth="lg"
      scroll="paper"
      fullWidth
      withFullScreen
      onClose={onClose}
      aria-labelledby={'editor-dialog-title-'}
      titleProps={{
        id: 'editor-dialog-title-',
      }}
      open={open}
    >
      <div>
        <CustomResourceForm crd={crd} />
      </div>
    </Dialog>
  );
}
