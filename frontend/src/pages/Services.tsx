import Navbar from '../components/Navbar'
import XrayService from '../components/XrayService'
import BrainTumorsDetection from '../assets/brain_thumor_bg.png'
import LungCancerDetection from '../assets/lung_cancer_bg.png'

export default function Services() {
    const services = [ {"name": "Brain Tumors Detection", "description": "The best Brain Thumor Detectyion" , "image": BrainTumorsDetection},
                       {"name": "Lung Cancer Detection", "description": "The best Lung Cancer Detectyion" , "image": LungCancerDetection} ]
    return (
        <div className='bg-gradient-to-r bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500'>
            <Navbar />
            <XrayService services={services}/>
            
        </div>
    )
}