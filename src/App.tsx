import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Video, FileText, Home, GraduationCap, ChevronRight, ExternalLink, BarChart3, Info } from 'lucide-react';

const BSUEngineeringApp = () => {
  const [view, setView] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDept, setFilterDept] = useState('all');
  const [filterSem, setFilterSem] = useState('all');
  const [filterCat, setFilterCat] = useState('all');

  const courses = [
    // Mathematics
    {code: "MATH101", name: "Calculus I", dept: "Mathematics", category: "Differential Calculus", sem: 1, credits: 3, pdf: "https://drive.google.com/math101.pdf", video: "https://youtu.be/calculus1", desc: "Limits, derivatives, and applications"},
    {code: "MATH102", name: "Calculus II", dept: "Mathematics", category: "Integral Calculus", sem: 2, credits: 3, pdf: "https://drive.google.com/math102.pdf", video: "https://youtu.be/calculus2", desc: "Integration techniques and series"},
    {code: "MATH201", name: "Differential Equations", dept: "Mathematics", category: "Advanced Mathematics", sem: 3, credits: 3, pdf: "https://drive.google.com/math201.pdf", video: "https://youtu.be/diffeq", desc: "Ordinary differential equations"},
    {code: "MATH202", name: "Linear Algebra", dept: "Mathematics", category: "Matrix Theory", sem: 3, credits: 3, pdf: "https://drive.google.com/math202.pdf", video: "https://youtu.be/linalg", desc: "Matrices, vectors, and transformations"},
    {code: "MATH301", name: "Complex Analysis", dept: "Mathematics", category: "Advanced Mathematics", sem: 5, credits: 3, pdf: "https://drive.google.com/math301.pdf", video: "https://youtu.be/complex", desc: "Complex numbers and functions"},
    {code: "MATH302", name: "Numerical Methods", dept: "Mathematics", category: "Applied Mathematics", sem: 5, credits: 3, pdf: "https://drive.google.com/math302.pdf", video: "https://youtu.be/numerical", desc: "Computational mathematics"},
    
    // Physics
    {code: "PHYS101", name: "Physics I - Mechanics", dept: "Physics", category: "Classical Mechanics", sem: 1, credits: 3, pdf: "https://drive.google.com/phys101.pdf", video: "https://youtu.be/mechanics", desc: "Newton's laws and dynamics"},
    {code: "PHYS102", name: "Physics II - E&M", dept: "Physics", category: "Electromagnetism", sem: 2, credits: 3, pdf: "https://drive.google.com/phys102.pdf", video: "https://youtu.be/em", desc: "Electric and magnetic fields"},
    {code: "PHYS201", name: "Thermodynamics", dept: "Physics", category: "Thermal Physics", sem: 3, credits: 3, pdf: "https://drive.google.com/phys201.pdf", video: "https://youtu.be/thermo", desc: "Heat and energy systems"},
    {code: "PHYS202", name: "Wave Physics & Optics", dept: "Physics", category: "Wave Mechanics", sem: 4, credits: 3, pdf: "https://drive.google.com/phys202.pdf", video: "https://youtu.be/waves", desc: "Wave propagation and light"},
    {code: "PHYS301", name: "Modern Physics", dept: "Physics", category: "Quantum Physics", sem: 5, credits: 3, pdf: "https://drive.google.com/phys301.pdf", video: "https://youtu.be/modern", desc: "Quantum mechanics basics"},
    {code: "PHYS302", name: "Solid State Physics", dept: "Physics", category: "Material Physics", sem: 6, credits: 3, pdf: "https://drive.google.com/phys302.pdf", video: "https://youtu.be/solidstate", desc: "Crystal structures"},
    
    // Chemistry
    {code: "CHEM101", name: "General Chemistry", dept: "Chemistry", category: "Basic Chemistry", sem: 1, credits: 3, pdf: "https://drive.google.com/chem101.pdf", video: "https://youtu.be/genchem", desc: "Atomic structure and bonding"},
    {code: "CHEM102", name: "Organic Chemistry", dept: "Chemistry", category: "Carbon Chemistry", sem: 2, credits: 3, pdf: "https://drive.google.com/chem102.pdf", video: "https://youtu.be/organic", desc: "Hydrocarbons and functional groups"},
    {code: "CHEM201", name: "Physical Chemistry", dept: "Chemistry", category: "Chemical Physics", sem: 3, credits: 3, pdf: "https://drive.google.com/chem201.pdf", video: "https://youtu.be/physchem", desc: "Thermodynamics and kinetics"},
    {code: "CHEM202", name: "Analytical Chemistry", dept: "Chemistry", category: "Chemical Analysis", sem: 4, credits: 3, pdf: "https://drive.google.com/chem202.pdf", video: "https://youtu.be/analytical", desc: "Quantitative analysis methods"},
    {code: "CHEM301", name: "Inorganic Chemistry", dept: "Chemistry", category: "Metal Chemistry", sem: 5, credits: 3, pdf: "https://drive.google.com/chem301.pdf", video: "https://youtu.be/inorganic", desc: "Coordination compounds"},
    {code: "CHEM302", name: "Polymer Chemistry", dept: "Chemistry", category: "Material Chemistry", sem: 6, credits: 3, pdf: "https://drive.google.com/chem302.pdf", video: "https://youtu.be/polymer", desc: "Synthetic polymers"},
    
    // Engineering Drawing
    {code: "DRAW101", name: "Engineering Drawing I", dept: "Engineering Drawing", category: "Technical Drawing", sem: 1, credits: 2, pdf: "https://drive.google.com/draw101.pdf", video: "https://youtu.be/draw1", desc: "Orthographic projections"},
    {code: "DRAW102", name: "Engineering Drawing II", dept: "Engineering Drawing", category: "Advanced Drawing", sem: 2, credits: 2, pdf: "https://drive.google.com/draw102.pdf", video: "https://youtu.be/draw2", desc: "Isometric and sectional views"},
    {code: "DRAW201", name: "CAD", dept: "Engineering Drawing", category: "Digital Design", sem: 3, credits: 3, pdf: "https://drive.google.com/cad201.pdf", video: "https://youtu.be/cad", desc: "AutoCAD and 3D modeling"},
    {code: "DRAW202", name: "Solid Modeling", dept: "Engineering Drawing", category: "3D Modeling", sem: 4, credits: 3, pdf: "https://drive.google.com/solid202.pdf", video: "https://youtu.be/solidworks", desc: "SolidWorks design"},
    
    // Mechanics
    {code: "MECH101", name: "Statics", dept: "Mechanics", category: "Force Systems", sem: 2, credits: 3, pdf: "https://drive.google.com/statics.pdf", video: "https://youtu.be/statics", desc: "Equilibrium of rigid bodies"},
    {code: "MECH102", name: "Dynamics", dept: "Mechanics", category: "Motion Analysis", sem: 3, credits: 3, pdf: "https://drive.google.com/dynamics.pdf", video: "https://youtu.be/dynamics", desc: "Kinematics and kinetics"},
    {code: "MECH201", name: "Strength of Materials", dept: "Mechanics", category: "Material Mechanics", sem: 3, credits: 3, pdf: "https://drive.google.com/strength.pdf", video: "https://youtu.be/strength", desc: "Stress and strain analysis"},
    {code: "MECH202", name: "Fluid Mechanics", dept: "Mechanics", category: "Fluid Dynamics", sem: 4, credits: 3, pdf: "https://drive.google.com/fluid.pdf", video: "https://youtu.be/fluid", desc: "Flow properties"},
    {code: "MECH301", name: "Machine Design", dept: "Mechanics", category: "Mechanical Design", sem: 5, credits: 4, pdf: "https://drive.google.com/machine.pdf", video: "https://youtu.be/machine", desc: "Design of mechanical systems"},
    {code: "MECH302", name: "Vibrations", dept: "Mechanics", category: "Dynamic Systems", sem: 6, credits: 3, pdf: "https://drive.google.com/vibrations.pdf", video: "https://youtu.be/vibrations", desc: "Oscillation analysis"},
    
    // Production
    {code: "PROD101", name: "Manufacturing Processes I", dept: "Production", category: "Basic Manufacturing", sem: 3, credits: 3, pdf: "https://drive.google.com/manuf1.pdf", video: "https://youtu.be/manuf1", desc: "Casting and forming processes"},
    {code: "PROD102", name: "Manufacturing Processes II", dept: "Production", category: "Advanced Manufacturing", sem: 4, credits: 3, pdf: "https://drive.google.com/manuf2.pdf", video: "https://youtu.be/manuf2", desc: "Machining processes"},
    {code: "PROD201", name: "Metrology & Quality Control", dept: "Production", category: "Measurement Systems", sem: 5, credits: 3, pdf: "https://drive.google.com/metrology.pdf", video: "https://youtu.be/metrology", desc: "Precision measurement"},
    {code: "PROD202", name: "CNC & Automation", dept: "Production", category: "CNC", sem: 5, credits: 3, pdf: "https://drive.google.com/cnc.pdf", video: "https://youtu.be/cnc", desc: "CNC programming"},
    {code: "PROD301", name: "Production Planning", dept: "Production", category: "Industrial Planning", sem: 6, credits: 3, pdf: "https://drive.google.com/planning.pdf", video: "https://youtu.be/planning", desc: "Scheduling and optimization"},
    {code: "PROD302", name: "Industrial Robotics", dept: "Production", category: "Automation", sem: 7, credits: 3, pdf: "https://drive.google.com/robotics.pdf", video: "https://youtu.be/robotics", desc: "Robot programming"}
  ];

  const departments = {
    "Mathematics": { icon: "∑", color: "blue" },
    "Physics": { icon: "⚛", color: "indigo" },
    "Chemistry": { icon: "⚗", color: "emerald" },
    "Engineering Drawing": { icon: "📐", color: "amber" },
    "Mechanics": { icon: "⚙", color: "blue" },
    "Production": { icon: "🏭", color: "rose" }
  };

  const categories = [...new Set(courses.map(c => c.category))];
  const semesters = [...new Set(courses.map(c => c.sem))].sort((a, b) => a - b);

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.code.toLowerCase().includes(searchQuery.toLowerCase());
      const matchDept = filterDept === 'all' || course.dept === filterDept;
      const matchSem = filterSem === 'all' || course.sem === parseInt(filterSem);
      const matchCat = filterCat === 'all' || course.category === filterCat;
      return matchSearch && matchDept && matchSem && matchCat;
    });
  }, [searchQuery, filterDept, filterSem, filterCat]);

  const getColorClass = (dept) => {
    const colorMap = {
      blue: "border-blue-500 bg-blue-500/10",
      indigo: "border-indigo-500 bg-indigo-500/10",
      emerald: "border-emerald-500 bg-emerald-500/10",
      amber: "border-amber-500 bg-amber-500/10",
      rose: "border-rose-500 bg-rose-500/10"
    };
    return colorMap[departments[dept]?.color] || "border-gray-500 bg-gray-500/10";
  };

  const getGradientClass = (color) => {
    const gradientMap = {
      blue: "from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600",
      indigo: "from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600",
      emerald: "from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600",
      amber: "from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600",
      rose: "from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600"
    };
    return gradientMap[color] || "from-blue-600 to-blue-700";
  };

  const CourseCard = ({ course }) => (
    <button
      onClick={() => {setSelectedCourse(course); setView('details');}}
      className={`w-full ${getColorClass(course.dept)} rounded-xl p-5 text-left transition-all duration-300 border-2 hover:scale-105 hover:shadow-lg`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="text-2xl">{departments[course.dept]?.icon}</div>
        <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-full">
          Sem {course.sem}
        </span>
      </div>
      <h3 className="text-white font-bold text-lg mb-2">{course.name}</h3>
      <p className="text-blue-400 text-sm font-mono mb-2">{course.code}</p>
      <p className="text-gray-400 text-xs mb-2">{course.desc}</p>
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-xs">{course.dept}</span>
        <ChevronRight className="text-gray-500" size={18} />
      </div>
    </button>
  );

  const MenuButton = ({ icon: Icon, label, onClick, color = "blue" }) => (
    <button
      onClick={onClick}
      className={`w-full bg-gradient-to-r ${getGradientClass(color)} text-white rounded-xl p-4 flex items-center gap-3 transition-all duration-300 hover:scale-105 shadow-lg`}
    >
      <Icon size={24} />
      <span className="font-semibold">{label}</span>
    </button>
  );

  const HomePage = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-3">
          <GraduationCap size={40} />
          <h1 className="text-3xl font-bold">BSU Engineering</h1>
        </div>
        <p className="text-blue-50 text-sm">Faculty of Engineering - Beni Suef University</p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-400 text-sm mb-2">Department</label>
          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Departments</option>
            {Object.keys(departments).map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-2">Semester</label>
          <select
            value={filterSem}
            onChange={(e) => setFilterSem(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Semesters</option>
            {semesters.map(sem => (
              <option key={sem} value={sem}>Semester {sem}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-2">Category</label>
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gray-800 rounded-xl p-4 text-center border border-gray-700">
          <div className="text-3xl font-bold text-blue-400">{filteredCourses.length}</div>
          <div className="text-gray-400 text-xs mt-1">Courses</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 text-center border border-gray-700">
          <div className="text-3xl font-bold text-emerald-400">{Object.keys(departments).length}</div>
          <div className="text-gray-400 text-xs mt-1">Departments</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 text-center border border-gray-700">
          <div className="text-3xl font-bold text-indigo-400">{semesters.length}</div>
          <div className="text-gray-400 text-xs mt-1">Semesters</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <MenuButton icon={BarChart3} label="View Statistics" onClick={() => setView('stats')} color="indigo" />
        <MenuButton icon={Info} label="About System" onClick={() => setView('about')} color="blue" />
      </div>

      <div>
        <h2 className="text-white text-xl font-bold mb-4">Available Courses</h2>
        {filteredCourses.length === 0 ? (
          <div className="bg-gray-800 rounded-xl p-8 text-center border border-gray-700">
            <Search className="mx-auto text-gray-600 mb-3" size={48} />
            <p className="text-gray-400">No courses found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCourses.map(course => (
              <CourseCard key={course.code} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const DetailsPage = () => {
    if (!selectedCourse) return null;
    
    return (
      <div className="space-y-6">
        <button
          onClick={() => {setView('home'); setSelectedCourse(null);}}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <Home size={20} />
          <span className="font-medium">Back to Home</span>
        </button>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 shadow-xl">
          <div className="flex items-start gap-4 mb-6">
            <div className="text-5xl">{departments[selectedCourse.dept]?.icon}</div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">{selectedCourse.name}</h1>
              <p className="text-blue-400 text-lg font-mono">{selectedCourse.code}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
              <div className="text-gray-400 text-sm mb-1">Department</div>
              <div className="text-white font-semibold">{selectedCourse.dept}</div>
            </div>
            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
              <div className="text-gray-400 text-sm mb-1">Semester</div>
              <div className="text-white font-semibold">Semester {selectedCourse.sem}</div>
            </div>
            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
              <div className="text-gray-400 text-sm mb-1">Category</div>
              <div className="text-white font-semibold">{selectedCourse.category}</div>
            </div>
            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
              <div className="text-gray-400 text-sm mb-1">Credits</div>
              <div className="text-white font-semibold">{selectedCourse.credits} Hours</div>
            </div>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700 mb-6">
            <div className="text-gray-400 text-sm mb-2">Description</div>
            <div className="text-white">{selectedCourse.desc}</div>
          </div>

          <h2 className="text-white font-bold text-lg mb-4">Course Resources</h2>
          
          <div className="space-y-3">
            <button
              onClick={() => window.open(selectedCourse.pdf, '_blank')}
              className="w-full bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white rounded-xl p-5 flex items-center justify-between transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-4">
                <FileText size={24} />
                <div className="text-left">
                  <div className="font-bold text-lg">Course PDF</div>
                  <div className="text-rose-100 text-sm">Lecture notes and materials</div>
                </div>
              </div>
              <ExternalLink size={20} />
            </button>

            <button
              onClick={() => window.open(selectedCourse.video, '_blank')}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-xl p-5 flex items-center justify-between transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-4">
                <Video size={24} />
                <div className="text-left">
                  <div className="font-bold text-lg">Video Lectures</div>
                  <div className="text-emerald-100 text-sm">Watch on YouTube</div>
                </div>
              </div>
              <ExternalLink size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const StatsPage = () => {
    const deptStats = Object.keys(departments).map(dept => ({
      name: dept,
      count: courses.filter(c => c.dept === dept).length,
      icon: departments[dept].icon
    }));

    return (
      <div className="space-y-6">
        <button
          onClick={() => setView('home')}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
        >
          <Home size={20} />
          <span>Back to Home</span>
        </button>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6">System Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">{courses.length}</div>
              <div className="text-gray-400">Total Courses</div>
            </div>
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 text-center">
              <div className="text-4xl font-bold text-emerald-400 mb-2">{courses.reduce((sum, c) => sum + c.credits, 0)}</div>
              <div className="text-gray-400">Total Credits</div>
            </div>
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 text-center">
              <div className="text-4xl font-bold text-indigo-400 mb-2">{Object.keys(departments).length}</div>
              <div className="text-gray-400">Departments</div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-4">Courses by Department</h3>
          <div className="space-y-3">
            {deptStats.map(stat => (
              <div key={stat.name} className="bg-gray-900/50 rounded-xl p-4 border border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{stat.icon}</div>
                  <div className="text-white font-semibold">{stat.name}</div>
                </div>
                <div className="text-blue-400 font-bold text-lg">{stat.count} courses</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const AboutPage = () => (
    <div className="space-y-6">
      <button
        onClick={() => setView('home')}
        className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
      >
        <Home size={20} />
        <span>Back to Home</span>
      </button>

      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
        <div className="flex items-center gap-4 mb-6">
          <GraduationCap size={48} className="text-blue-400" />
          <div>
            <h2 className="text-2xl font-bold text-white">BSU Engineering Resources v2.0</h2>
            <p className="text-gray-400">Faculty of Engineering - Beni Suef University</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="text-emerald-400 mt-1">✓</div>
            <div className="text-white">Comprehensive course database with 36 courses</div>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-emerald-400 mt-1">✓</div>
            <div className="text-white">Easy access to PDF materials and video lectures</div>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-emerald-400 mt-1">✓</div>
            <div className="text-white">Advanced search and filtering options</div>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-emerald-400 mt-1">✓</div>
            <div className="text-white">Modern and responsive user interface</div>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
          <p className="text-blue-300 text-sm">
            © 2025 BSU Engineering Resources - Made with ❤️ for BSU Students by DEV omar selem  
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {view === 'home' && <HomePage />}
        {view === 'details' && <DetailsPage />}
        {view === 'stats' && <StatsPage />}
        {view === 'about' && <AboutPage />}
      </div>
    </div>
  );
};

export default BSUEngineeringApp;