import { useState } from 'react'
import Navbar from '~/components/navbar'
import FileUploader from '~/components/FileUploader'
import type { FormEvent } from 'react'
import { usePuterStore } from '~/lib/puter'
import { useNavigate } from 'react-router'
import { convertPdfToImage } from '~/lib/pdf2img'
import { generateUuid } from '~/utils'
import { prepareInstructions } from 'constants/index'

const upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore()
    const navigate = useNavigate()
    const [isProcessing, setIsProcessing] = useState(false)
    const [statusText, setStatusText] = useState("")
    const [file, setFile] = useState<File | null>(null)

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleAnalyze = async ({companyName, jobTitle, jobDescription, file}: {companyName: string, jobTitle: string, jobDescription: string, file: File | null}) => {
        if (!file) {
            setStatusText("No file selected")
            return
        }

        setIsProcessing(true)
        setStatusText("Uploading your resume pdf...")

        const uploadedFile = await fs.upload([file])

        if (!uploadedFile) {
            setIsProcessing(false)
            setStatusText("Failed to upload your resume")
            return
        }

        setStatusText("Converting your resume to an image...")
        let imgFile: File | null = null
        if (file) {
            const conversionResult = await convertPdfToImage(file)
            imgFile = conversionResult.file
            console.log("Image converted:", imgFile)
            if (conversionResult.error) {
                console.error("PDF conversion error:", conversionResult.error)
            }
        }

        if (!imgFile) {
            setIsProcessing(false)
            setStatusText("Failed to convert your resume to an image")
            return
        }

        setStatusText("Uploading your resume image...")
        const uploadedImage = await fs.upload([imgFile])

        if (!uploadedImage) {
            setStatusText("Failed to upload your resume image")
            return setIsProcessing(false)
        }

        setStatusText("Preparing your resume for analysis...")
        const uuid = generateUuid()
        const data = {
            uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName,
            jobTitle,
            jobDescription,
            feedback: "",
        }

        await kv.set(`resume:${uuid}`, JSON.stringify(data))

        setStatusText("Analyzing your resume...")

        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({jobTitle, jobDescription})
        )

        if (!feedback) {
            setIsProcessing(false)
            setStatusText("Failed to analyze your resume")
            return
        }
            
        const feedbackText = typeof feedback === 'string' 
        ? feedback.message.content
        : feedback.message.content[0].text;

        data.feedback = JSON.parse(feedbackText)
        await kv.set(`resume:${uuid}`, JSON.stringify(data))
        setStatusText("Analysis complete! Redirecting...")
        console.log(data)        
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget.closest('form')
        if (!form) return
        const formData = new FormData(form)

        const companyName = formData.get('company-name') as string
        const jobTitle = formData.get('job-title') as string
        const jobDescription = formData.get('job-description') as string

        if (!file) return;

        handleAnalyze({companyName, jobTitle, jobDescription, file})
    }
        

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />

    <section className="main-section">
        <div className='page-heading py-16'>
            <h1>Smart Feedback for your resume</h1>
            {isProcessing ? (
                <>
                    <h2>{statusText}</h2>
                    <img src="/public/images/resume-scan.gif" className='w-full'/>
                </> 
            ) : (
                <h2>Drop in your resume for an ATS score and AI feedback</h2>
            )}

            {!isProcessing && (
                <form id="upload-form" onSubmit={handleSubmit} className='flex flex-col gap-4 mt-8'>
                    <div className='form-div'>
                        <label htmlFor='company-name'>Company Name</label>
                        <input type="text" name='company-name' placeholder='Company Name'></input>

                    </div>
                    <div className='form-div'>
                        <label htmlFor='job-title'>Job Title</label>
                        <input type="text" name='job-title' placeholder='Job Title'></input>

                    </div>
                    <div className='form-div'>
                        <label htmlFor='job-description'>Job Description</label>
                        <textarea rows={5} name='job-description' placeholder='Job Description'></textarea>

                    </div>
                    <div className='form-div'>
                        <label htmlFor='uploader'>Upload Resume</label>
                        <FileUploader onFileSelect={handleFileSelect} />
                    </div>

                    <button type='submit' className='primary-button'>Analyze</button>
                </form>
            )}

        </div>
    </section>
    </main>
  )
}

export default upload