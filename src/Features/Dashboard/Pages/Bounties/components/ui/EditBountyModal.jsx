import { useState, useRef } from 'react'
import { X, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { updateBounty } from '../../../../../../services/bounties'
import { uploadFile } from '../../../../../../services/api'
import Step1BountyDetails from '../../../CreateBounty/steps/SetBountyDetails'
import Step2RewardLogistics from '../../../CreateBounty/steps/Step2RewardLogistics'

const toDateTimeLocal = (iso) => {
  if (!iso) return ''
  // Deadlines are treated as UTC literals across the create/edit flow.
  return String(iso).slice(0, 16)
}

export default function EditBountyModal({ bounty, onClose, onSaved }) {
  const [activeStep, setActiveStep] = useState(1)
  const [isSaving, setIsSaving] = useState(false)
  const [errors, setErrors] = useState({})
  const filesRef = useRef({})
  const [formData, setFormData] = useState({
    title: bounty?.title || '',
    description: bounty?.description || '',
    imageUrl: bounty?.imageUrl || '',
    deliverables: bounty?.deliverables || [],
    attachments: bounty?.attachments || [],
    rewardAmount: bounty?.rewardAmount || 0,
    rewardType: bounty?.rewardType || 'fixed',
    rewardToken: bounty?.rewardToken || 'USDC',
    skills: bounty?.skills || [],
    isPrivate: bounty?.isPrivate || false,
    difficulty: bounty?.difficulty || 'Intermediate',
    category: bounty?.category || '',
    applicationDeadline: toDateTimeLocal(bounty?.applicationDeadline),
    bountyDeadline: toDateTimeLocal(bounty?.dueDate),
  })

  const updateFormData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  const validateStep = (step) => {
    const errs = {}
    if (step === 1) {
      if (!formData.title.trim()) errs.title = 'Bounty title is required'
      else if (formData.title.trim().length < 5)
        errs.title = 'Title must be at least 5 characters'
      if (!formData.description.trim())
        errs.description = 'Description is required'
      else if (formData.description.trim().length < 20)
        errs.description = 'Description must be at least 20 characters'
      if (!formData.category) errs.category = 'Please select a category'
      if (!formData.difficulty)
        errs.difficulty = 'Please select an experience level'
    }
    if (step === 2) {
      if (!formData.rewardAmount || formData.rewardAmount <= 0)
        errs.rewardAmount = 'Enter a valid reward amount greater than 0'
      if (
        formData.applicationDeadline &&
        formData.bountyDeadline &&
        new Date(formData.applicationDeadline) >= new Date(formData.bountyDeadline)
      ) {
        errs.bountyDeadline =
          'Bounty deadline must be after application deadline'
      }
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleNext = () => {
    if (validateStep(activeStep)) setActiveStep((s) => Math.min(s + 1, 2))
  }

  const handleBack = () => setActiveStep((s) => Math.max(s - 1, 1))

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    files.forEach((f) => {
      filesRef.current[f.name] = f
    })
    updateFormData('attachments', [
      ...formData.attachments,
      ...files.map((f) => f.name),
    ])
  }

  const handleFilesSelect = (files) => {
    files.forEach((f) => {
      filesRef.current[f.name] = f
    })
    updateFormData('attachments', [
      ...formData.attachments,
      ...files.map((f) => f.name),
    ])
  }

  const removeAttachment = (index) => {
    const name = formData.attachments[index]
    delete filesRef.current[name]
    const updated = [...formData.attachments]
    updated.splice(index, 1)
    updateFormData('attachments', updated)
  }

  const removeSkill = (skill) => {
    updateFormData(
      'skills',
      formData.skills.filter((s) => s !== skill),
    )
  }

  const handleImageUpload = async (file) => {
    try {
      const result = await uploadFile(file)
      const url = result.data?.url || result.url
      updateFormData('imageUrl', url)
      return url
    } catch (error) {
      toast.error('Failed to upload image')
      throw error
    }
  }

  const handleSave = async () => {
    const step1Valid = validateStep(1)
    const step2Valid = validateStep(2)
    if (!step1Valid) {
      setActiveStep(1)
      return
    }
    if (!step2Valid) {
      setActiveStep(2)
      return
    }

    setIsSaving(true)
    try {
      const attachmentUrls = await Promise.all(
        formData.attachments.map(async (name) => {
          const file = filesRef.current[name]
          if (file) {
            const result = await uploadFile(file)
            return result.data?.url || result.url
          }
          return name
        }),
      )

      const res = await updateBounty(bounty.id, {
        title: formData.title,
        description: formData.description,
        imageUrl: formData.imageUrl || null,
        deliverables: formData.deliverables,
        attachments: attachmentUrls,
        skills: formData.skills,
        rewardAmount: formData.rewardAmount,
        rewardType: formData.rewardType,
        rewardToken: formData.rewardToken,
        difficulty: formData.difficulty,
        category: formData.category,
        isPrivate: formData.isPrivate,
        applicationDeadline: formData.applicationDeadline
          ? new Date(formData.applicationDeadline).toISOString()
          : null,
        bountyDeadline: formData.bountyDeadline
          ? new Date(formData.bountyDeadline).toISOString()
          : null,
      })

      toast.success('Bounty updated successfully')
      onSaved?.(res.data)
      onClose()
    } catch (error) {
      toast.error(error.message || 'Failed to update bounty')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm p-0 sm:items-center sm:p-5"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSaving) onClose()
      }}
    >
      <div className="flex max-h-[92dvh] w-full flex-col overflow-hidden bg-white shadow-2xl rounded-t-3xl sm:rounded-3xl sm:max-w-205 sm:max-h-[90vh]">
        <div className="flex items-center justify-between border-b border-[#edf0f4] px-5 py-4 sm:px-8">
          <div>
            <h2 className="font-inter font-bold text-lg text-[#1a2a41]">
              Edit Bounty
            </h2>
            <p className="font-inter text-xs text-[#6b7a8f] mt-0.5">
              Update your bounty details. Available only before applications are
              received.
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isSaving}
            className="rounded-lg p-2 text-[#6b7a8f] hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex items-center gap-3 border-b border-[#edf0f4] px-5 py-3 sm:px-8">
          {[1, 2].map((step) => (
            <div key={step} className="flex flex-1 items-center gap-2 last:flex-none">
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                  activeStep >= step
                    ? 'bg-[#34A563] text-white'
                    : 'bg-[#d9d9d9] text-white'
                }`}
              >
                {activeStep > step ? '✓' : step}
              </div>
              <span
                className={`font-inter text-xs font-semibold whitespace-nowrap ${
                  activeStep >= step ? 'text-[#34A563]' : 'text-[#6b7a8f]'
                }`}
              >
                {step === 1 ? 'Bounty Details' : 'Reward & Logistics'}
              </span>
              {step === 1 && (
                <div
                  className={`mx-1 h-0.5 flex-1 ${
                    activeStep > 1 ? 'bg-[#34A563]' : 'bg-[#dce1e8]'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 pt-4 pb-5 sm:px-8 sm:pt-5 sm:pb-6">
          {activeStep === 1 ? (
            <Step1BountyDetails
              formData={formData}
              updateFormData={updateFormData}
              handleFileUpload={handleFileUpload}
              removeAttachment={removeAttachment}
              onFilesSelect={handleFilesSelect}
              onImageUpload={handleImageUpload}
              errors={errors}
            />
          ) : (
            <Step2RewardLogistics
              formData={formData}
              updateFormData={updateFormData}
              removeSkill={removeSkill}
              errors={errors}
            />
          )}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-[#edf0f4] px-5 py-4 sm:px-8">
          <button
            onClick={handleBack}
            disabled={activeStep === 1 || isSaving}
            className="rounded-xl border border-[#dce1e8] px-5 py-2.5 text-sm font-semibold text-[#1a2a41] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
          >
            Back
          </button>

          {activeStep < 2 ? (
            <button
              onClick={handleNext}
              className="rounded-xl bg-[#34A563] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#007A55] cursor-pointer"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 rounded-xl bg-[#34A563] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#007A55] disabled:opacity-70 cursor-pointer"
            >
              {isSaving && <Loader2 size={16} className="animate-spin" />}
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
