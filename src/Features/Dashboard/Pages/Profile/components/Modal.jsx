import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

export default function Modal({
  title,
  description,
  children,
  onClose,
  initialFocusRef,
}) {
  const closeButtonRef = useRef(null)
  const dialogRef = useRef(null)

  useEffect(() => {
    const previouslyFocusedElement = document.activeElement
    const elementToFocus = initialFocusRef?.current || closeButtonRef.current
    elementToFocus?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const focusableElements = dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (!focusableElements?.length) {
        event.preventDefault()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (!dialogRef.current.contains(document.activeElement)) {
        event.preventDefault()
        const edgeElement = event.shiftKey ? lastElement : firstElement
        edgeElement.focus()
      } else if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previouslyFocusedElement?.focus?.()
    }
  }, [initialFocusRef, onClose])

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-modal-title"
        ref={dialogRef}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2
              id="profile-modal-title"
              className="text-base font-bold text-[#111827]"
            >
              {title}
            </h2>
            {description && (
              <p className="mt-1 text-xs leading-5 text-[#6B7280]">
                {description}
              </p>
            )}
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="shrink-0 rounded-lg p-2 text-[#6B7280] transition-colors hover:bg-gray-100 hover:text-[#111827] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#009966]"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </section>
    </div>
  )
}
