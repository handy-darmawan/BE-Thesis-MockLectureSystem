class TransactionHelper {
  static shared = new TransactionHelper();

  rawQueryAllTransactions = "select tr.transaction_id, tr.lecturer_id, msl.lecturer_name, msc.course_id, msc.course_description, tr.class_id, TO_CHAR(mss.shift_start_time, 'HH24:MI') as shift_start_time , TO_CHAR(mss.shift_end_time , 'HH24:MI') as shift_end_time, msst.status_description , tr.transaction_date , tr.transaction_link from tr_transaction tr inner join ms_lecturer msl on tr.lecturer_id = msl.lecturer_id inner join ms_shift mss on tr.shift_id = mss.shift_id inner join ms_status msst on tr.status_id = msst.status_id inner join ms_course msc on tr.course_id = msc.course_id";

  listOfCourse = [
    ["ABCD5678", "Algorithm and Programming"],
    ["EFGH1234", "Fundamental In Game Balancing"],
    ["IJKL9012", "Intelligence Automation"],
    ["MNOP2345", "Digital Design Production"],
    ["QRST5678", "Embedded System and Internet of Things"],
    ["UVWX9012", "Entrepreneurship: Prototyping"],
    ["YZAB3456", "Financial Management"],
    ["CDEF6789", "Event Management for Brand"],
    ["GHIJ2345", "Regional Integration in East Asia"],
    ["KLMN9012", "Decision Analytics"],
    ["OPQR5678", "Psychological Intervention"],
    ["STUV9012", "Marketing Research"],
    ["WXYZ3456", "Introduction to Primary Curriculum"],
    ["ABCD9921", "Tropical Architecture"],
    ["EFGH0012", "Game Tools Development"],
    ["IJKL1209", "Data & Text Mining"],
    ["MNOP3782", "Global Supply Chain"],
    ["QRST1029", "Language Innovations in Marketing and Advertising"],
    ["ABCD1234", "Legal Reasoning"],
    ["EFGH5678", "Numerical Analysis"],
    ["IJKL9012", "Managerial Economics"],
    ["MNOP3456", "Scientific Computing"],
    ["QRST9012", "Society and Digital Culture"],
    ["UVWX5678", "Statistics for Psychology"],
    ["YZAB3456", "Advanced Taxation"],
    ["CDEF9012", "Tourism Destination and Planning Management"],
    ["GHIJ2345", "Visual Storytelling"],
    ["KLMN5678", "Web Programming"],
    ["QRST9281", "Accounting Principles"],
    ["UVWX1212", "Art and Craft"],
    ["YAZA1230", "Biological Psychology"],
    ["ABCD5678", "Business Chinese Conversation II"],
    ["EFGH9012", "Chemistry for Civil Engineering"],
    ["IJKL3456", "Communication Research Methodology"],
    ["MNOP5678", "Design History Studies"],
    ["QRST9012", "Introduction to Management and Business"],
    ["UVWX5678", "Media, War, and Peace"],
    ["YZAB1234", "Cost Accounting"],
    [
      "CDEF5678",
      "International Political Economy of Multinational Corporations",
    ],
    ["GHIJ9012", "Information Systems Project Management"],
    ["KLMN5678", "Intermediate Japanese Grammar & Reading Comprehension II"],
    ["OPQR9012", "Language Testing"],
    ["STUV5678", "Management Information Systems for Leader"],
    ["WXYZ1234", "Product & Brand Strategy"],
    ["CDKC0012", "Physics I"],
    ["STUF1998", "Learning and Cognitive Psychology"],
    ["ABCD1234", "Research Methodology"],
    ["EFGH5678", "Sustainable Engineering Systems"],
    ["IJKL9012", "Social Media Broadcasting"],
    ["LMNO5678", "Human-Computer Interaction"],
    ["PQRT9012", "Advanced Machine Learning"],
    ["UVWX5678", "Digital Marketing Strategies"],
    ["YZAB1234", "Ethics in Technology"],
    ["CDEF5678", "Project Management for IT"],
    ["GHIJ9012", "Mobile App Development"],
    ["KLMN5678", "Blockchain Fundamentals"],
    ["OPQR9012", "Digital Security and Privacy"],
    ["STUV5678", "Cloud Computing Technologies"],
    ["WXYZ1234", "User Experience Design"],
    ["CEFF1922", "Big Data Analytics"],
    ["STUV8912", "Internet of Things Applications"],
    ["LMNO1234", "Artificial Intelligence Ethics"],
    ["PQRS5678", "Network Security Fundamentals"],
    ["UVWX7890", "Strategic Brand Management"],
    ["YZAB2345", "Mobile Application Design"],
    ["CDEF6789", "Data Visualization Techniques"],
    ["GHIJ9012", "Global Business Strategies"],
    ["KLMN3456", "Human-Computer Interaction Design"],
    ["OPQR5678", "Social Media Marketing"],
    ["STUV9012", "Entrepreneurial Finance"],
    ["WXYZ3456", "Introduction to Machine Learning"],
    ["CDEF1266", "Digital Communication Strategies"],
    ["GHIJ0192", "International Business Law"],
    ["KLMN7574", "Cybersecurity Risk Management"],
    ["ABCD3456", "Bioinformatics and Computational Biology"],
    ["EFGH5678", "Renewable Energy Technologies"],
    ["IJKL9012", "Strategic Leadership in Technology"],
    ["MNOP2345", "Digital Transformation in Business"],
    ["QRST5678", "Human-Centric Design Thinking"],
    ["UVWX9012", "Economics of Innovation"],
    ["YZAB3456", "Corporate Finance and Investment"],
    ["CDEF6789", "Event Planning and Execution"],
    ["GHIJ2345", "Cross-Cultural Communication"],
    ["KLMN9012", "Business Process Optimization"],
    ["OPQR5678", "Positive Psychology"],
    ["STUV9012", "Consumer Behavior Analysis"],
    ["WXYZ3456", "Foundations of Artificial Neural Networks"],
    ["ABCD8374", "International Relations and Global Governance"],
    ["EFGH0091", "Interactive Game Development"],
    ["IJKL1284", "Text Analytics and Natural Language Processing"],
    ["MNOP1283", "Logistics and Transportation Management"],
    ["JDIW4123", "Innovative Marketing Strategies"],
    ["ABCD1234", "Intellectual Property Law"],
    ["EFGH5678", "Environmental Impact Assessment"],
    ["IJKL9012", "Social Network Analysis"],
    ["MNOP3456", "High-Performance Computing"],
    ["QRST9012", "Digital Citizenship and Ethics"],
    ["UVWX5678", "Psychology of Consumer Behavior"],
    ["YZAB3456", "Tax Planning and Strategy"],
    ["CDEF9012", "Hospitality and Tourism Marketing"],
    ["GHIJ2345", "Digital Media Production"],
    ["KLMN5678", "Advanced Web Development"],
    ["OPQR9012", "Computer-Assisted Language Learning"],
    ["STUV5678", "Strategic Information Systems Management"],
    ["WXYZ1234", "Brand Innovation and Design Thinking"],
    ["CDEF2842", "Quantum Computing Fundamentals"],
    ["JDNE9182", "Neuroscience and Learning"],
    ["ABCD1234", "Experimental Research Design"],
    ["EFGH5678", "Green Building Technologies"],
    ["IJKL9012", "Social Media Management"],
    ["LMNO5678", "Digital Health Systems"],
    ["PQRST901", "Deep Learning and Neural Networks"],
    ["UVWX5678", "Content Marketing Strategies"],
    ["YZAB1234", "Technology and Society"],
    ["CDEF5678", "Agile Software Development"],
    ["GHIJ9012", "User Interface Design"],
    ["KLMN5678", "Smart Contracts and Distributed Ledger Technology"],
    ["OPQR9012", "Cybersecurity Governance and Compliance"],
    ["STUV5678", "Edge Computing Technologies"],
    ["WXYZ1234", "Interactive User Interface Design"],
    ["KENS1283", "Data Warehousing and Business Intelligence"],
    ["KMMN1293", "Smart Cities Planning and Development"],
  ];

  listOfLecturer = [
    ["LC111", "Prof. Miller Taylor"],
    ["LC222", "Dr. Wilson Brown"],
    ["LC333", "Ms. Moore Thompson"],
    ["LC444", "Mr. Martinez Johnson"],
    ["LC555", "Dr. Mitchell White"],
    ["LC666", "Prof. Turner Parker"],
    ["LC777", "Ms. Parker Phillips"],
    ["LC888", "Mr. Phillips Davis"],
    ["LC999", "Dr. Cooper Robinson"],
    ["LC121", "Prof. Bennett Carter"],
    ["LC232", "Ms. Reed Foster"],
    ["LC343", "Mr. Foster Williams"],
    ["LC454", "Dr. Coleman Harris"],
    ["LC565", "Prof. Russell Turner"],
    ["LC676", "Ms. Hayes Longfellow"],
    ["LC787", "Mr. Jenkins Jefferson"],
    ["LC898", "Dr. Fisher Miller"],
    ["LC909", "Prof. Simpson Anderson"],
    ["LC131", "Ms. Wells Smith"],
    ["LC781", "Prof. Anderson Rodriguez"],
    ["LC492", "Dr. Foster Sanchez"],
    ["LC563", "Ms. Turner Reynolds"],
    ["LC124", "Mr. Rodriguez Bennett"],
    ["LC895", "Dr. Mitchell Taylor"],
    ["LC236", "Prof. Sanchez Jefferson"],
    ["LC657", "Ms. Reynolds Jenkins"],
    ["LC408", "Mr. Bennett Miller"],
    ["LC719", "Dr. Taylor Carter"],
    ["LC530", "Prof. Coleman Wilson"],
    ["LC841", "Ms. Parker Hayes"],
    ["LC972", "Mr. Jenkins Russell"],
    ["LC303", "Dr. Wells Miller"],
    ["LC654", "Prof. Russell Davis"],
    ["LC126", "Ms. Hayes Jefferson"],
    ["LC879", "Mr.Miller Cooper"],
    ["LC945", "Dr. Fisher Longfellow"],
    ["LC317", "Prof. Cooper Parker"],
    ["LC608", "Ms. Longfellow Anderson"],
    ["LC231", "Mr. Jefferson Anto"],
    ["LC345", "Prof. Taylor Bennett"],
    ["LC456", "Dr. Brown Williams"],
    ["LC567", "Ms. Thompson Robinson"],
    ["LC678", "Mr. Johnson Davis"],
    ["LC789", "Dr. White Jenkins"],
    ["LC890", "Mr. Wilson Parker"],
    ["LC901", "Dr. Rodriguez Jenkins"],
    ["LC112", "Mr. Davis Turner"],
    ["LC223", "Dr. Robinson Cooper"],
    ["LC334", "Prof. Carter Rodriguez"],
    ["LC445", "Ms. Foster Turner"],
    ["LC556", "Mr. Williams Longfellow"],
    ["LC667", "Dr. Harris Russell"],
    ["LC778", "Prof. Turner Cooper"],
    ["LC889", "Ms. Longfellow Hayes"],
    ["LC900", "Mr. Jefferson Jenkins"],
    ["LC113", "Dr. Brown Anderson"],
    ["LC224", "Prof. Turner Foster"],
    ["LC335", "Ms. Phillips White"],
    ["LC446", "Mr. Jefferson Taylor"],
    ["LC557", "Dr. Foster Robinson"],
    ["LC668", "Ms. Williams Thompson"],
    ["LC779", "Prof. Davis Smith"],
    ["LC114", "Ms. Longfellow Hayes_1"],
    ["LC225", "Mr. Russell Phillips"],
    ["LC336", "Prof. Foster White"],
    ["LC447", "Dr. Davis Taylor"],
    ["LC558", "Ms. Robinson Foster"],
    ["LC669", "Mr. Turner Smith"],
    ["LC780", "Dr. Bennett Turner"],
    ["LC891", "Prof. Cooper Brown"],
    ["LC902", "Ms. Jenkins Parker"],
  ];

  listOfClass = [
    "TFX-60",
    "EGM-59",
    "PRJ-15",
    "BCJ-45",
    "ZGN-52",
    "ZVR-25",
    "VPE-81",
    "EVS-32",
    "QRW-93",
    "BDQ-58",
    "NHE-26",
    "PLJ-62",
    "ORF-15",
    "WFW-47",
    "RMC-36",
    "KCN-51",
    "FQX-36",
    "YAO-62",
    "VBG-36",
    "CFY-02",
    "ONM-43",
    "GPG-10",
    "UBU-84",
    "CLI-69",
    "TIB-95",
    "CXF-57",
    "JDV-97",
    "PLW-68",
    "KFF-80",
    "YMD-34",
    "TNE-56",
    "AAC-27",
    "PQA-15",
    "UKU-91",
    "UTN-82",
    "NXC-24",
    "LSH-61",
    "EJT-43",
    "SOY-75",
    "NXB-53",
    "AVN-05",
    "GXQ-61",
    "OPZ-14",
    "RWT-83",
    "APV-04",
    "FKQ-51",
    "ZJS-42",
    "HFS-78",
    "SMU-22",
    "FDD-80",
  ];

  linkZoom = "zoommtg://zoom.us/join?confno=8832108083&pwd=&uname=";

  getRandomInt(max, min) {
    return Math.floor(Math.random() * max) + min;
  }

  getDayCount(start_date, end_date) {
    const start = new Date(start_date);
    const end = new Date(end_date);
    const days = (end - start) / (1000 * 60 * 60 * 24);
    return days;
  }

  formatDate(date) {
    let month = date.getMonth() + 1;
    const year = date.getFullYear();
    let day = date.getDate();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  generateTransactions() {
    let listsOfTransactions = [];
    /* generate for 6 shift */
    for (let x = 0; x < 6; x++) {
      /* generate for each lecturer to make sure only 1 lecturer in one shift*/
      for (let y = 0; y < this.listOfLecturer.length; y++) {
        const randomCourseInt = this.getRandomInt(
          this.listOfLecturer.length,
          0
        );
        const course = this.listOfCourse[randomCourseInt];

        const randomClassInt = this.getRandomInt(this.listOfClass.length, 0);
        const classID = this.listOfClass[randomClassInt];

        const transaction = {
          lecturerName: this.listOfLecturer[y][1],
          lecturerID: this.listOfLecturer[y][0],
          courseID: course[0],
          courseDescription: course[1],
          shiftID: x + 1,
          linkZoom: this.linkZoom,
          classID: classID,
        };
        listsOfTransactions.push(transaction);
      }
    }
    return listsOfTransactions;
  }

  getShift(shift) {
    const [shiftStart, shiftEnd] = shift.split(" - ");
    return [shiftStart+":00", shiftEnd+":00"]
  }
}

module.exports = TransactionHelper.shared;
