import { useState, useRef } from 'react'

const DELIVERABLE_TYPES = [
  { value: 'image', label: 'Image', icon: 'image', desc: 'PNG, JPG, SVG, GIF, WebP' },
  { value: 'zip', label: 'Zip File', icon: 'folder_zip', desc: 'ZIP, RAR, 7z archives' },
  { value: 'audio', label: 'Audio', icon: 'audio_file', desc: 'MP3, WAV, AAC, FLAC' },
  { value: 'link', label: 'Link', icon: 'link', desc: 'URL to deployed work' },
]

const deliverableIcons = {
  image: 'image',
  zip: 'folder_zip',
  audio: 'audio_file',
  link: 'link',
}

export default function Step1BountyDetails({
  formData,
  updateFormData,
  handleFileUpload,
  removeAttachment,
  onFilesSelect,
  errors = {},
}) {
  const fileInputRef = useRef(null)
  const [newDelType, setNewDelType] = useState('image')
  const [newDelDesc, setNewDelDesc] = useState('')

  const addDeliverable = () => {
    const desc = newDelDesc.trim()
    if (!desc) return
    const item = JSON.stringify({ type: newDelType, description: desc })
    updateFormData('deliverables', [...formData.deliverables, item])
    setNewDelDesc('')
  }

  const removeDeliverable = (index) => {
    const updated = [...formData.deliverables]
    updated.splice(index, 1)
    updateFormData('deliverables', updated)
  }

  const parseDel = (str) => {
    try {
      return JSON.parse(str)
    } catch {
      return { type: 'link', description: str }
    }
  }

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
      onFilesSelect(files)
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
            className={`w-full py-3 px-4 border rounded-xl font-inter text-sm text-[#1a2a41] bg-white outline-none transition-all placeholder:text-[#a0b0c4] focus:ring-2 ${
              errors.title
                ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                : 'border-[#dce1e8] focus:border-primary focus:ring-[#34A563]/20'
            }`}
            placeholder="e.g. Design landing page hero"
            value={formData.title}
            onChange={(e) => updateFormData('title', e.target.value)}
            maxLength={100}
          />
          <span className="absolute bottom-2.5 right-3 font-inter text-[11px] text-[#a0b0c4] pointer-events-none">
            {formData.title.length}/100
          </span>
        </div>
        {errors.title && (
          <p className="text-red-500 text-xs mt-1 font-inter">{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <label className="font-inter font-semibold text-base text-[#1a2a41]">
          Description / Scope of work
        </label>
        <p className="font-inter text-sm text-[#6b7a8f] -mt-0.5">
          Describe your requirements, goals and any specific details.
        </p>
        <div
          className={`border rounded-xl overflow-hidden bg-[#fafbfc] focus-within:ring-2 transition-all mt-1 ${
            errors.description
              ? 'border-red-400 focus-within:border-red-500 focus-within:ring-red-500/20'
              : 'border-[#dce1e8] focus-within:border-primary focus-within:ring-[#34A563]/20'
          }`}
        >
          <textarea
            className="w-full py-4 px-5 font-inter text-sm text-[#1a2a41] bg-transparent outline-none resize-y min-h-[160px] placeholder:text-[#a0b0c4]"
            placeholder="Provide a detailed description of the work to be done..."
            value={formData.description}
            onChange={(e) => updateFormData('description', e.target.value)}
            maxLength={3000}
            rows={6}
          />
        </div>
        {errors.description && (
          <p className="text-red-500 text-xs mt-1 font-inter">
            {errors.description}
          </p>
        )}
      </div>

      {/* Deliverables */}
      <div className="flex flex-col gap-3">
        <div>
          <label className="font-inter font-semibold text-sm text-[#1a2a41] flex items-center gap-1">
            Deliverables
          </label>
          <p className="font-inter text-xs text-[#6b7a8f] mt-0.5">
            Specify what the builder needs to deliver. Choose the type that matches each deliverable.
          </p>
        </div>

        {formData.deliverables.length > 0 && (
          <div className="flex flex-col gap-2">
            {formData.deliverables.map((item, idx) => {
              const del = parseDel(item)
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-[#f8fafc] border border-[#e8ecf1] rounded-xl px-4 py-3"
                >
                  <span className="material-symbols-outlined text-xl text-[#34A563]">
                    {deliverableIcons[del.type] || 'description'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-medium text-[#34A563] uppercase tracking-wide">
                      {del.type}
                    </span>
                    <p className="text-sm text-[#1a2a41] truncate">{del.description}</p>
                  </div>
                  <button
                    onClick={() => removeDeliverable(idx)}
                    className="bg-transparent border-none cursor-pointer text-[#a0b0c4] p-1 rounded transition-colors hover:text-[#e74c3c] hover:bg-red-50"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              )
            })}
          </div>
        )}

        <div className="flex flex-col gap-2 p-4 border border-dashed border-[#dce1e8] rounded-xl bg-[#fafbfc]">
          <div className="flex flex-row gap-2">
            <select
              value={newDelType}
              onChange={(e) => setNewDelType(e.target.value)}
              className="px-3 py-2 border border-[#dce1e8] rounded-lg bg-white text-sm text-[#1a2a41] outline-none focus:border-[#34A563] cursor-pointer"
            >
              {DELIVERABLE_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
            <input
              type="text"
              value={newDelDesc}
              onChange={(e) => setNewDelDesc(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addDeliverable() } }}
              placeholder="Describe this deliverable..."
              className="flex-1 px-3 py-2 border border-[#dce1e8] rounded-lg bg-white text-sm text-[#1a2a41] outline-none focus:border-[#34A563] placeholder:text-[#a0b0c4]"
            />
            <button
              onClick={addDeliverable}
              disabled={!newDelDesc.trim()}
              className="px-4 py-2 bg-[#34A563] text-white text-sm font-medium rounded-lg hover:bg-[#007A55] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Add
            </button>
          </div>
          <p className="text-xs text-[#a0b0c4]">
            {DELIVERABLE_TYPES.find((t) => t.value === newDelType)?.desc}
          </p>
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

      {/* Image URL */}
      <div className="flex flex-col gap-1.5">
        <label className="font-inter font-semibold text-sm text-[#1a2a41] flex items-center gap-1">
          Cover Image URL <span className="text-[#94A3B8] text-xs font-normal">(optional)</span>
        </label>
        <p className="font-inter text-xs text-[#6b7a8f] -mt-0.5">
          Provide a URL to an image that represents your bounty.
        </p>
        <input
          type="url"
          className="w-full py-3 px-4 border border-[#dce1e8] rounded-xl font-inter text-sm text-[#1a2a41] bg-white outline-none transition-all placeholder:text-[#a0b0c4] focus:ring-2 focus:border-primary focus:ring-[#34A563]/20"
          placeholder="https://example.com/bounty-image.jpg"
          value={formData.imageUrl}
          onChange={(e) => updateFormData('imageUrl', e.target.value)}
        />
        {formData.imageUrl && (
          <div className="mt-1 rounded-xl overflow-hidden border border-[#dce1e8]">
            <img
              src={formData.imageUrl}
              alt="Preview"
              className="w-full h-32 object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>
        )}
      </div>

      {/* Category */}
      <div className="flex flex-col gap-1.5">
        <label className="font-inter font-semibold text-sm text-[#1a2a41] flex items-center gap-1">
          Category
          <span className="text-[#e74c3c]">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            'Design',
            'Development',
            'Content',
            'Marketing',
            'Security',
            'Data',
            'Research',
            'Other',
          ].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => updateFormData('category', cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                formData.category === cat
                  ? 'border-[#34A563] bg-[#f0faf5] text-[#34A563] shadow-[0_0_0_1px_#34A563]'
                  : 'border-[#dce1e8] bg-white text-[#1a2a41] hover:border-[#b0c4d8]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        {errors.category && (
          <p className="text-red-500 text-xs mt-1 font-inter">
            {errors.category}
          </p>
        )}
      </div>

      {/* Experience Level */}
      <div className="flex flex-col gap-1.5">
        <label className="font-inter font-semibold text-sm text-[#1a2a41] flex items-center gap-1">
          Experience Level
          <span className="text-[#e74c3c]">*</span>
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'Beginner', label: 'Beginner', desc: 'Entry-level, guided tasks' },
            { value: 'Intermediate', label: 'Intermediate', desc: 'Some experience needed' },
            { value: 'Advanced', label: 'Advanced', desc: 'Expert-level challenges' },
          ].map((level) => (
            <button
              key={level.value}
              type="button"
              onClick={() => updateFormData('difficulty', level.value)}
              className={`flex flex-col items-start gap-1 p-4 rounded-xl border text-left transition-all ${
                formData.difficulty === level.value
                  ? 'border-[#34A563] bg-[#f0faf5] shadow-[0_0_0_1px_#34A563]'
                  : 'border-[#dce1e8] bg-white hover:border-[#b0c4d8]'
              }`}
            >
              <span className={`font-semibold text-sm ${formData.difficulty === level.value ? 'text-[#34A563]' : 'text-[#1a2a41]'}`}>
                {level.label}
              </span>
              <span className="text-xs text-[#6b7a8f]">{level.desc}</span>
            </button>
          ))}
        </div>
        {errors.difficulty && (
          <p className="text-red-500 text-xs mt-1 font-inter">{errors.difficulty}</p>
        )}
      </div>
    </div>
  )
}
