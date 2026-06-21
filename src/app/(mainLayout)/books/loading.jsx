import { Spinner } from '@heroui/react';

const loading = () => {
    return (
        <div className="flex flex-col items-center gap-2">
        <Spinner color="success" />
        <span className="text-xs text-muted">Success</span>
      </div>
    );
};

export default loading;