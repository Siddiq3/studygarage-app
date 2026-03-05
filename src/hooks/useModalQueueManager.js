import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_AFTER_CLOSE_DELAY = 620;

export function useModalQueueManager() {
  const [activeModal, setActiveModal] = useState(null);
  const activeModalRef = useRef(null);
  const queueRef = useRef([]);
  const delayedRequestTimersRef = useRef([]);
  const afterCloseTimerRef = useRef(null);

  const clearDelayedRequestTimer = useCallback((id) => {
    delayedRequestTimersRef.current = delayedRequestTimersRef.current.filter(
      (item) => {
        if (item.id === id) {
          clearTimeout(item.timer);
          return false;
        }
        return true;
      }
    );
  }, []);

  const processQueue = useCallback(() => {
    if (activeModalRef.current || queueRef.current.length === 0) {
      return;
    }

    queueRef.current.sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }
      return a.createdAt - b.createdAt;
    });

    const next = queueRef.current.shift();
    setActiveModal(next?.id ?? null);
  }, []);

  const requestModal = useCallback(
    (id, options = {}) => {
      if (!id) return;

      const priority = Number.isFinite(options.priority)
        ? options.priority
        : 10;
      const delayMs = Number.isFinite(options.delayMs)
        ? Math.max(0, options.delayMs)
        : 0;

      const alreadyActive = activeModalRef.current === id;
      const alreadyQueued = queueRef.current.some((item) => item.id === id);
      const alreadyScheduled = delayedRequestTimersRef.current.some(
        (item) => item.id === id
      );

      if (alreadyActive || alreadyQueued || alreadyScheduled) {
        return;
      }

      const enqueue = () => {
        queueRef.current.push({
          id,
          priority,
          createdAt: Date.now(),
        });
        processQueue();
      };

      if (delayMs > 0) {
        const timer = setTimeout(() => {
          clearDelayedRequestTimer(id);
          enqueue();
        }, delayMs);

        delayedRequestTimersRef.current.push({ id, timer });
        return;
      }

      enqueue();
    },
    [clearDelayedRequestTimer, processQueue]
  );

  const dismissQueuedModal = useCallback((id) => {
    if (!id) return;
    queueRef.current = queueRef.current.filter((item) => item.id !== id);
    clearDelayedRequestTimer(id);
  }, [clearDelayedRequestTimer]);

  const closeActiveModal = useCallback(
    (options = {}) => {
      const delayMs = Number.isFinite(options.afterCloseDelayMs)
        ? Math.max(0, options.afterCloseDelayMs)
        : DEFAULT_AFTER_CLOSE_DELAY;

      setActiveModal(null);

      if (afterCloseTimerRef.current) {
        clearTimeout(afterCloseTimerRef.current);
        afterCloseTimerRef.current = null;
      }

      afterCloseTimerRef.current = setTimeout(() => {
        afterCloseTimerRef.current = null;
        processQueue();
      }, delayMs);
    },
    [processQueue]
  );

  useEffect(() => {
    activeModalRef.current = activeModal;
  }, [activeModal]);

  useEffect(() => {
    processQueue();
  }, [activeModal, processQueue]);

  useEffect(
    () => () => {
      if (afterCloseTimerRef.current) {
        clearTimeout(afterCloseTimerRef.current);
        afterCloseTimerRef.current = null;
      }

      delayedRequestTimersRef.current.forEach((item) => {
        clearTimeout(item.timer);
      });
      delayedRequestTimersRef.current = [];
      queueRef.current = [];
    },
    []
  );

  return {
    activeModal,
    requestModal,
    closeActiveModal,
    dismissQueuedModal,
  };
}

export default useModalQueueManager;
