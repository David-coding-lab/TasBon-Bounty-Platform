import { useState } from 'react'
import Step2RewardLogistics from './steps/Step2RewardLogistics'
import Step3ReviewPublish from './steps/Step3ReviewPublish'
import BountyFooter from './components/BountyFooter'
import StepsIndicator from './components/StepsIndicator'
import Step1BountyDetails from './steps/SetBountyDetails'
import { useNavigate } from 'react-router-dom'
import BountyHeader from './components/Header'
import { createBounty } from '../../../../pages/Bounties/Api/bounties'
import { toast } from 'sonner'

const CreateBountyModal = () => {
  const [activeStep, setActiveStep] = useState(1)
  const navigate = useNavigate()
  const isOpen = window.location.href.includes('?modal=create-bounty')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deliverables: [],
    attachments: [],
    rewardAmount: 500,
    rewardType: 'fixed',
    applicationDeadline: '',
    bountyDeadline: '',
    skills: ['Solidity', 'Smart Contract', 'DeFi', 'Security'],
    isPrivate: false,
  })

  const handleNext = () => {
    if (activeStep < 3) setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    if (activeStep > 1) setActiveStep(activeStep - 1)
  }

  const [isPublishing, setIsPublishing] = useState(false)

  const handlePublish = async () => {
    setIsPublishing(true)
    try {
      await createBounty({
        title: formData.title,
        description: formData.description,
        deliverables: formData.deliverables,
        attachments: formData.attachments,
        skills: formData.skills,
        rewardAmount: formData.rewardAmount,
        rewardType: formData.rewardType,
        isPrivate: formData.isPrivate,
        applicationDeadline: formData.applicationDeadline || null,
        bountyDeadline: formData.bountyDeadline || null,
      })
      toast.success('Bounty published successfully!')
      navigate(-1)
    } catch (error) {
      toast.error(error.message || 'Failed to publish bounty')
    } finally {
      setIsPublishing(false)
    }
  }

  const handleClose = () => {
    navigate(-1) // Navigate back to the previous page
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleClose()
  }

  const updateFormData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const addDeliverable = () => {
    const newDeliverable = prompt('Enter deliverable description:')
    if (newDeliverable && newDeliverable.trim()) {
      updateFormData('deliverables', [
        ...formData.deliverables,
        newDeliverable.trim(),
      ])
    }
  }

  const removeDeliverable = (index) => {
    const updated = [...formData.deliverables]
    updated.splice(index, 1)
    updateFormData('deliverables', updated)
  }

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length) {
      const fileNames = files.map((f) => f.name)
      updateFormData('attachments', [...formData.attachments, ...fileNames])
    }
  }

  const removeAttachment = (index) => {
    const updated = [...formData.attachments]
    updated.splice(index, 1)
    updateFormData('attachments', updated)
  }

  const addSkill = (e) => {
    if (e.key === 'Enter') {
      const value = e.target.value.trim()
      if (value && !formData.skills.includes(value)) {
        updateFormData('skills', [...formData.skills, value])
      }
      e.target.value = ''
    }
  }

  const removeSkill = (skill) => {
    updateFormData(
      'skills',
      formData.skills.filter((s) => s !== skill),
    )
  }

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <Step1BountyDetails
            formData={formData}
            updateFormData={updateFormData}
            addDeliverable={addDeliverable}
            removeDeliverable={removeDeliverable}
            handleFileUpload={handleFileUpload}
            removeAttachment={removeAttachment}
          />
        )
      case 2:
        return (
          <Step2RewardLogistics
            formData={formData}
            updateFormData={updateFormData}
            addSkill={addSkill}
            removeSkill={removeSkill}
          />
        )
      case 3:
        return <Step3ReviewPublish formData={formData} />
      default:
        return null
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm w-[100vw] h-[100vh] flex items-center justify-center z-1000 p-5"
        onClick={handleOverlayClick}
      >
        <div className="bg-white rounded-3xl max-w-205 w-full max-h-[90vh] flex flex-col shadow-2xl animate-[modalFadeIn_0.25s_ease-out] overflow-hidden">
          <BountyHeader onClose={handleClose} />
          <StepsIndicator activeStep={activeStep} />
          <div className="flex-1 overflow-y-auto px-8 pt-5 pb-6 scrollbar-thin scrollbar-track-[#f0f3f7] scrollbar-thumb-[#d0d7e0] hover:scrollbar-thumb-[#b0c0d0] max-sm:px-5 max-sm:pt-4 max-sm:pb-5">
            {renderStepContent()}
          </div>
          <BountyFooter
            activeStep={activeStep}
            onBack={handleBack}
            onNext={handleNext}
            onPublish={handlePublish}
            isPublishing={isPublishing}
          />
        </div>
      </div>
    </div>
  )
}

export default CreateBountyModal
