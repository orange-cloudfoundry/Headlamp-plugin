import { ActionButton } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { NewCrDialog } from './NewCrDialog';
import React, { useState } from 'react';
import CRD from '@kinvolk/headlamp-plugin/lib/K8s/crd';

interface NewCrButtonProps {
  crd: CRD;
}

export function NewCrButton({ crd }: NewCrButtonProps) {
  const [open, setOpen] = useState(false);
  console.log('crdButton: ', crd);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <ActionButton
        description={'Create'}
        onClick={() => {
          handleClickOpen();
        }}
        icon="mdi:add"
      />
      <NewCrDialog open={open} onClose={handleClose} crd={crd} />
    </div>
  );
}
