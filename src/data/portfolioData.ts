export interface ProjectResult {
  label: string
  value: string
}

export interface ProjectItem {
  id: string
  title: string
  subtitle: string
  shortDescription: string
  image: string
  imageAlt: string
  technologies: string[]
  githubUrl: string
  secondaryUrl?: string
  secondaryUrlLabel?: string
  demoUrl?: string
  demoNote?: string
  featured: boolean
  accentColor: string
  details: {
    overview: string
    problem: string
    technicalApproach: string
    keyImplementation: string[]
    technologies: string[]
    reportedResults: ProjectResult[]
    resultsDisclaimer: string
  }
}

export interface ExperienceItem {
  id: string
  role: string
  company: string
  period: string
  location: string
  description: string
  highlights: string[]
}

export interface SkillCategory {
  category: string
  skills: string[]
}

export const PERSONAL_INFO = {
  name: "Krish Yadav",
  wordmark: "KY",
  tagline: "Exploring what lies behind intelligent systems.",
  heroSubtext: "Computer Science Engineering student specialising in Artificial Intelligence & Machine Learning at UPES Dehradun.",
  aboutText: [
    "I'm Krish Yadav, a Computer Science Engineering student specialising in AI and Machine Learning at UPES Dehradun (CGPA 8.60/10).",
    "My technical focus centres on understanding how models extract patterns from images, process sequential data, and interact reliably across networked systems.",
    "I spend most of my time implementing architectures directly from code, examining where pipelines break, and building software with care."
  ],
  education: {
    degree: "B.Tech in Computer Science and Engineering (AI & ML)",
    institution: "UPES Dehradun",
    cgpa: "8.60 / 10",
  },
  email: "krishp10025@gmail.com",
  socials: {
    github: "https://github.com/krishyadav25",
    linkedin: "https://www.linkedin.com/in/krish-yadav-cse/",
    instagram: "https://www.instagram.com/krish_25k/",
  },
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "deepfake-detection",
    title: "Deepfake Detection System",
    subtitle: "Multi-Stream Visual Analysis & Attention-Gated Forensic Fusion",
    shortDescription:
      "An image-based deepfake detection architecture that fuses semantic deep features, frequency-domain representations, edge seam maps, and sensor acquisition traces through an Attention Gate.",
    image: "/assets/project-deepfake.jpg",
    imageAlt: "Forensic visualization of facial geometry, frequency-domain wavelet grid, and attention heatmaps in pale blue and lavender",
    technologies: ["Python", "PyTorch", "Computer Vision", "CNNs", "Attention Mechanisms"],
    githubUrl: "https://github.com/krishyadav25/deepfake-detection",
    featured: true,
    accentColor: "#A9A7D9",
    details: {
      overview:
        "Designed and implemented an image-based forensic system engineered to differentiate manipulated and synthetic facial imagery from authentic captures by analyzing structural, spectral, and generative artifact signatures.",
      problem:
        "Modern deepfake synthesis techniques generate high-fidelity images that deceive casual inspection and conventional single-stream convolutional networks. Standard models typically evaluate high-level semantic patterns while overlooking subtle frequency irregularities, boundary blending seams, and sensor noise inconsistencies.",
      technicalApproach:
        "Built a multi-stream visual feature extraction architecture that analyzes facial images across complementary analytical streams: semantic deep representations from convolutional backbones, frequency-domain representations (revealing spectral discrepancies), edge detection filters (capturing blending seams), and camera acquisition-trace features. These four feature branches are integrated via an Attention Gate fusion module that weights the most diagnostically salient signals before passing into the final classification head.",
      keyImplementation: [
        "Four-stream visual feature extraction pipeline (semantic, frequency, edge, acquisition-trace)",
        "PyTorch Attention Gate module dynamically weighting salient forensic cues",
        "Feature fusion layer combining multi-scale representations into a binary classifier",
        "Rigorous cross-validation on project test splits with precision-recall evaluation"
      ],
      technologies: ["Python", "PyTorch", "Computer Vision", "CNNs", "Attention Mechanisms"],
      reportedResults: [
        { label: "Classification Accuracy", value: "94.05%" },
        { label: "ROC-AUC Score", value: "97.12%" },
        { label: "Macro F1-Score", value: "93.99%" },
      ],
      resultsDisclaimer:
        "Reported experimental results on project test splits as documented in benchmark evaluations. Laboratory model results; does not represent universal deepfake detection or production deployment guarantees.",
    },
  },
  {
    id: "medical-tumour-detection",
    title: "Medical Tumour Detection (3D)",
    subtitle: "Volumetric MRI Segmentation & Graph Neural Network Severity Classification",
    shortDescription:
      "A collaborative medical-imaging workflow combining 3D U-Net volumetric segmentation with Graph Attention Networks (GAT) to extract spatial tumour features and classify pathological severity grades, packaged into a full-stack interface.",
    image: "/assets/project-medical.jpg",
    imageAlt: "3D volumetric brain MRI visualization with segmented tumour boundaries and topological Graph Attention Network in cool indigo and pale cyan",
    technologies: ["Python", "3D U-Net", "GNN / GAT", "PyTorch Geometric", "React"],
    githubUrl: "https://github.com/Pranjal-Seluriyal/Medical_Tumour_Detection_3D",
    demoUrl: "https://medical-tumour-detection-3-d.vercel.app",
    demoNote: "Collaborative Project Web Interface (Demo)",
    featured: false,
    accentColor: "#B9C9DE",
    details: {
      overview:
        "A collaborative medical-imaging project that segments brain tumours from 3D multi-parametric MRI volumes and extracts topological structural graphs to classify pathological tumour severity levels.",
      problem:
        "Accurately determining tumour boundaries and clinical severity from volumetric 3D MRI scans is challenging due to heterogeneous tissue intensities, irregular shapes, and complex 3D spatial interdependencies that 2D planar models cannot adequately represent.",
      technicalApproach:
        "Implemented a multi-stage pipeline: 3D volumetric preprocessing (intensity normalization, skull stripping, and spatial resampling), volumetric tumour segmentation utilizing a 3D U-Net architecture, extraction of segmented tumour sub-regions into topological graph representations (where nodes capture regional texture/intensity and edges model spatial proximity), and classification of severity grades using Graph Attention Networks (GAT). A React web application connects to a Python backend to provide interactive slice inspection and model inferences.",
      keyImplementation: [
        "Volumetric 3D MRI intensity normalization, spatial resampling, and skull stripping workflows",
        "3D U-Net deep architecture for volumetric tumour segmentation",
        "Topological graph construction mapping localized sub-regions and spatial proximity",
        "Graph Attention Network (GAT) severity classifier and full-stack web integration"
      ],
      technologies: ["Python", "3D U-Net", "PyTorch Geometric", "GNN / GAT", "React"],
      reportedResults: [
        { label: "Dice Similarity Coefficient", value: "0.7543" },
        { label: "Severity-Classification Accuracy", value: "90.9%" },
      ],
      resultsDisclaimer:
        "Reported research model experimental results on benchmark datasets. Collaborative research project; not clinically validated, approved as a medical device, or intended for clinical decision-making.",
    },
  },
  {
    id: "networked-robot-teleoperation",
    title: "Networked Robot Teleoperation & Safety Architecture",
    subtitle: "Resilient Socket Protocol, Watchdog Supervision & State-Latching Safety System",
    shortDescription:
      "A networked teleoperation control system featuring deterministic TCP/IP communication, JSON command framing, a heartbeat watchdog with 1.5s timeout, and a safety-aware state machine with latched emergency stops.",
    image: "/assets/project-teleop.jpg",
    imageAlt: "Technical schematic illustration of remote teleoperation terminal connected to a robotic mechanism with telemetry stream in midnight indigo and pale blue",
    technologies: ["Python", "TCP/IP Sockets", "JSON Protocol", "State Machines", "Automated Testing", "Git"],
    githubUrl: "https://github.com/krishyadav25/networked-robot-teleoperation",
    secondaryUrl: "https://github.com/soumya-jain123/AISR-Project/tree/Krish",
    secondaryUrlLabel: "Shared Project Branch",
    featured: false,
    accentColor: "#66758F",
    details: {
      overview:
        "Designed and implemented a resilient network communication and safety-handling architecture for teleoperating a robot over TCP/IP networks via structured shell commands and message validation protocols.",
      problem:
        "Operating robotics over non-deterministic network connections introduces latency spikes, packet loss, and sudden socket drops. Without strict supervisory safety logic and deterministic state tracking, intermittent disconnections or malformed command streams risk hazardous motion.",
      technicalApproach:
        "Built a modular client-server socket protocol utilizing structured JSON message frames with sequence numbering and timestamp verification. Architected an internal finite state machine governing four distinct operational states: IDLE, MOVING, COMM_LOST, and ESTOP_LATCHED. Integrated a continuous heartbeat monitoring watchdog with a 1.5-second timeout and 0.25-second checking interval that halts robot motion upon connection loss, prevents motion commands in unsafe states, and enforces an explicit reset sequence to clear latched emergency stops.",
      keyImplementation: [
        "Client/server TCP/IP socket protocol with structured JSON message framing and validation",
        "Heartbeat watchdog with 1.5s timeout and 0.25s checking interval for rapid failsafe reaction",
        "Deterministic four-state safety engine (IDLE, MOVING, COMM_LOST, ESTOP_LATCHED)",
        "Robot interface abstraction, mock robot harness, and automated unit test coverage"
      ],
      technologies: ["Python", "TCP/IP Sockets", "JSON Protocol", "State Machines", "Automated Testing", "Git"],
      reportedResults: [
        { label: "Heartbeat Watchdog Timeout", value: "1.5s Timeout (0.25s Interval)" },
        { label: "Communication Loss Action", value: "Immediate Safe Halt" },
        { label: "Protocol Test Verification", value: "Automated Unit Test Suites" },
      ],
      resultsDisclaimer:
        "Verified and tested through automated unit test suites and the robot interface abstraction in simulated environments. Physical hardware validation is not claimed.",
    },
  },
  {
    id: "image-captioning-model",
    title: "Smart Image Captioning Model",
    subtitle: "Multimodal Visual Encoding & Attention-Driven Natural Language Generation",
    shortDescription:
      "An end-to-end vision-language pipeline trained on the Flickr8k benchmark, coupling convolutional feature backbones with recurrent and transformer-based attention architectures (including BLIP) to generate natural language descriptions.",
    image: "/assets/project-captioning.jpg",
    imageAlt: "Multimodal visual representation showing image feature extraction, spatial attention map, and sequential caption token decoding in cool misty blue and lavender",
    technologies: ["Python", "PyTorch", "Computer Vision", "CNNs", "RNNs", "Attention Mechanisms", "BLIP"],
    githubUrl: "https://github.com/krishyadav25/Image-Captioning-Model-",
    featured: false,
    accentColor: "#A9A7D9",
    details: {
      overview:
        "Engineered and evaluated multimodal deep learning models capable of synthesizing descriptive, grammatically coherent English captions from raw 2D input images.",
      problem:
        "Bridging visual perception with natural language generation requires grounding semantic tokens in fine-grained spatial image regions while preserving coherent syntactic flow across diverse object scenes.",
      technicalApproach:
        "Conducted multi-architecture experimentation on the Flickr8k dataset. Implemented an encoder-decoder architecture combining convolutional neural network (CNN) backbones with recurrent neural networks (RNN/LSTM) enhanced by Bahdanau spatial attention mechanisms, enabling the decoder to dynamically focus on relevant image regions during sequential token generation. Explored modern pretrained vision-language representations including BLIP to study transformer-based cross-modal attention.",
      keyImplementation: [
        "Dataset preparation, image preprocessing, and vocabulary tokenization workflows for Flickr8k",
        "CNN visual backbone feature extraction with spatial attention projection",
        "Recurrent neural network (RNN/LSTM) sequential token generator with dynamic attention weighting",
        "Comparative qualitative evaluations exploring pretrained vision-language BLIP models"
      ],
      technologies: ["Python", "PyTorch", "Computer Vision", "CNNs", "RNNs", "Attention Mechanisms", "BLIP"],
      reportedResults: [
        { label: "Benchmark Dataset", value: "Flickr8k Dataset" },
        { label: "Explored Architectures", value: "CNN-RNN Attention & BLIP" },
      ],
      resultsDisclaimer:
        "Academic and exploratory project focused on multimodal architecture evaluation. No unverified benchmark scores or commercial metrics are claimed.",
    },
  },
]

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "exp-ibm",
    role: "AI/ML Intern",
    company: "IBM",
    period: "June 2026 – July 2026",
    location: "Internship",
    description:
      "Worked on medical imaging workflows and deep learning architectures: volumetric 3D MRI preprocessing, 3D U-Net segmentation, and Graph Neural Network (GNN/GAT) methods for tumour severity classification.",
    highlights: [
      "Volumetric 3D MRI preprocessing pipelines, intensity normalization, and spatial resampling",
      "Exploration and integration of 3D U-Net architectures for anatomical tumour boundary segmentation",
      "Graph-based tumour representation and Graph Attention Network (GAT) classification methods",
    ],
  },
  {
    id: "exp-all-ways",
    role: "Data Analyst Intern",
    company: "All-Ways Manpower Solutions Pvt. Ltd.",
    period: "June 2025 – July 2025",
    location: "Dehradun, India",
    description:
      "Assisted with structured data processing, data organisation, and analytical workflows using Python and Pandas alongside Microsoft Excel for a Faculty Recruitment Web Portal.",
    highlights: [
      "Automated tabular data cleaning, validation, and normalization routines in Python and Pandas",
      "Dataset structuring, candidate records management, and Excel data manipulation workflows",
      "Data handling supporting operational recruitment portal workflows",
    ],
  },
]

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Programming",
    skills: ["Python", "C", "C++", "Java", "JavaScript"],
  },
  {
    category: "Web Development",
    skills: ["HTML", "CSS", "Flask"],
  },
  {
    category: "AI, Machine Learning and Computer Vision",
    skills: ["PyTorch", "scikit-learn", "OpenCV", "NumPy", "Pandas"],
  },
  {
    category: "Data and Tools",
    skills: ["SQL", "Matplotlib", "Git", "GitHub"],
  },
]
