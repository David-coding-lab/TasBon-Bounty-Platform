import { useRef } from 'react'

export default function Step1BountyDetails({
  formData,
  updateFormData,
  addDeliverable,
  removeDeliverable,
  handleFileUpload,
  removeAttachment,
}) {
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    e.currentTarget.classList.add(
      'border-[#34A563]',
      'bg-[#f0fdf4]',
      'ring-2',
      'ring-[#34A563]/20',
    )
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.currentTarget.classList.remove(
      'border-[#34A563]',
      'bg-[#f0fdf4]',
      'ring-2',
      'ring-[#34A563]/20',
    )
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.currentTarget.classList.remove(
      'border-[#34A563]',
      'bg-[#f0fdf4]',
      'ring-2',
      'ring-[#34A563]/20',
    )
    const files = Array.from(e.dataTransfer.files)
    if (files.length) {
      const fileNames = files.map((f) => f.name)
      updateFormData('attachments', [...formData.attachments, ...fileNames])
    }
  }

  return (
    <div className="flex flex-col gap-6 sm:gap-6">
      {/* Bounty Title */}
      <div className="flex flex-col gap-1.5">
        <label className="font-inter font-semibold text-sm text-[#1a2a41] flex items-center gap-1">
          Bounty Title
          <span className="text-[#e74c3c]">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            className="w-full py-3 px-4 border border-[#dce1e8] rounded-xl font-inter text-sm text-[#1a2a41] bg-white outline-none transition-all placeholder:text-[#a0b0c4] focus:border-[#34A563] focus:ring-2 focus:ring-[#34A563]/20"
            placeholder="e.g. Design landing page hero"
            value={formData.title}
            onChange={(e) => updateFormData('title', e.target.value)}
            maxLength={100}
          />
          <span className="absolute bottom-2.5 right-3 font-inter text-[11px] text-[#a0b0c4] pointer-events-none">
            {formData.title.length}/100
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <label className="font-inter font-semibold text-base text-[#1a2a41]">
          Description / Scope of work
        </label>
        <p className="font-inter text-sm text-[#6b7a8f] -mt-0.5">
          Describe your requirements, goals and any specific details.
        </p>
        <div className="border border-[#dce1e8] rounded-xl overflow-hidden bg-[#fafbfc] focus-within:border-[#34A563] focus-within:ring-2 focus-within:ring-[#34A563]/20 transition-all mt-1">
          <textarea
            className="w-full py-4 px-5 font-inter text-sm text-[#1a2a41] bg-transparent outline-none resize-y min-h-[160px] placeholder:text-[#a0b0c4]"
            placeholder="Provide a detailed description of the work to be done..."
            value={formData.description}
            onChange={(e) => updateFormData('description', e.target.value)}
            maxLength={3000}
            rows={6}
          />
          <div className="flex items-center justify-between px-3 py-2 border-t border-[#dce1e8] bg-white">
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="p-1.5 rounded hover:bg-[#f0f3f7] text-[#6b7a8f] transition-colors"
              >
                <span className="material-symbols-outlined text-lg">undo</span>
              </button>
              <button
                type="button"
                className="p-1.5 rounded hover:bg-[#f0f3f7] text-[#6b7a8f] transition-colors"
              >
                <span className="material-symbols-outlined text-lg">redo</span>
              </button>
              <div className="w-px h-5 bg-[#dce1e8] mx-1" />
              <button
                type="button"
                className="p-1.5 rounded hover:bg-[#f0f3f7] text-[#6b7a8f] transition-colors"
              >
                <span className="material-symbols-outlined text-lg">title</span>
              </button>
              <span className="font-inter text-xs text-[#6b7a8f] px-1">
                Inter
              </span>
              <span className="material-symbols-outlined text-sm text-[#6b7a8f]">
                expand_more
              </span>
              <span className="font-inter text-xs text-[#6b7a8f] px-1">24</span>
              <span className="material-symbols-outlined text-sm text-[#6b7a8f]">
                expand_more
              </span>
              <div className="w-px h-5 bg-[#dce1e8] mx-1" />
              <button
                type="button"
                className="p-1.5 rounded hover:bg-[#f0f3f7] text-[#6b7a8f] transition-colors"
              >
                <span className="material-symbols-outlined text-lg">
                  format_bold
                </span>
              </button>
              <button
                type="button"
                className="p-1.5 rounded hover:bg-[#f0f3f7] text-[#6b7a8f] transition-colors"
              >
                <span className="material-symbols-outlined text-lg">
                  format_italic
                </span>
              </button>
              <button
                type="button"
                className="p-1.5 rounded hover:bg-[#f0f3f7] text-[#6b7a8f] transition-colors"
              >
                <span className="material-symbols-outlined text-lg">
                  format_underlined
                </span>
              </button>
              <div className="w-px h-5 bg-[#dce1e8] mx-1" />
              <button
                type="button"
                className="p-1.5 rounded hover:bg-[#f0f3f7] text-[#6b7a8f] transition-colors"
              >
                <span className="material-symbols-outlined text-lg">
                  format_align_left
                </span>
              </button>
              <button
                type="button"
                className="p-1.5 rounded hover:bg-[#f0f3f7] text-[#6b7a8f] transition-colors"
              >
                <span className="material-symbols-outlined text-lg">
                  format_align_center
                </span>
              </button>
              <button
                type="button"
                className="p-1.5 rounded hover:bg-[#f0f3f7] text-[#6b7a8f] transition-colors"
              >
                <span className="material-symbols-outlined text-lg">
                  format_align_right
                </span>
              </button>
              <span className="material-symbols-outlined text-sm text-[#6b7a8f]">
                expand_more
              </span>
              <div className="w-px h-5 bg-[#dce1e8] mx-1" />
              <button
                type="button"
                className="p-1.5 rounded hover:bg-[#f0f3f7] text-[#6b7a8f] transition-colors"
              >
                <span className="material-symbols-outlined text-lg">
                  format_list_bulleted
                </span>
              </button>
              <span className="material-symbols-outlined text-sm text-[#6b7a8f]">
                expand_more
              </span>
              <div className="w-px h-5 bg-[#dce1e8] mx-1" />
              <button
                type="button"
                className="p-1.5 rounded hover:bg-[#f0f3f7] text-[#6b7a8f] transition-colors"
              >
                <span className="material-symbols-outlined text-lg">
                  expand_more
                </span>
              </button>
            </div>
            <span className="font-inter text-xs text-[#a0b0c4]">
              {formData.description.length}/3000
            </span>
          </div>
        </div>
      </div>

      {/* Attachments */}
      <div className="flex flex-col gap-1.5">
        <label className="font-inter font-semibold text-sm text-[#1a2a41] flex items-center gap-1">
          Attachments (Optional)
        </label>
        <div
          className="border-2 border-dashed border-[#dce1e8] rounded-xl py-8 px-5 text-center cursor-pointer transition-all bg-[#fafbfc] relative hover:border-[#34A563] hover:bg-[#fafffe]"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <span className="material-symbols-outlined text-4xl text-[#a0b0c4] mb-2 block">
            attach_file
          </span>
          <p className="font-inter text-sm text-[#1a2a41] my-1">
            Drag and drop files here, or click to browse
          </p>
          <span className="font-inter text-xs text-[#a0b0c4]">
            Supports PDF, PNG, JPG, Figma, ZIP (Max 25MB)
          </span>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            multiple
            onChange={handleFileUpload}
          />
        </div>
        {formData.attachments.length > 0 && (
          <div className="flex flex-col gap-1.5 mt-2">
            {formData.attachments.map((name, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-[#f8fafc] py-1.5 pl-2 pr-3 rounded-md font-inter text-[13px] text-[#1a2a41]"
              >
                <span className="material-symbols-outlined text-xl text-[#6b7a8f]">
                  attach_file
                </span>
                <span className="flex-1 truncate">{name}</span>
                <button
                  className="bg-transparent border-none cursor-pointer text-[#a0b0c4] ml-auto flex items-center p-0.5 rounded transition-colors hover:text-[#e74c3c] hover:bg-red-50"
                  onClick={() => removeAttachment(idx)}
                >
                  <span className="material-symbols-outlined text-xl">
                    delete
                  </span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
