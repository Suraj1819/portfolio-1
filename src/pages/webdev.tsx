import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import {
  Video,
  Monitor,
  Server,
  Code,
  Database,
  Terminal,
  FileCode,
  Rocket,
  Target,
  CheckCircle2,
  ChevronRight,
  Download,
  Play,
  BookMarked,
  Trophy,
  Star,
  GitBranch,
  Puzzle,
  BarChart,
  Users,
  Cloud,
  Quote,
  Linkedin,
  Twitter,
  Briefcase,
  Share2,
  CloudRain,
  BookOpen,
  Activity,
  ServerCog,
  Brush,
  Smartphone,
  Chrome,
  Eye,
  Shield,
  Bug,
  CheckCheck,
  ExternalLink,
  Filter,
  Sparkles,
  Brain,
  Wand2,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const WebDev_Course = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  // const [selectedTimeline, setSelectedTimeline] = useState("beginner");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setProgress(100);
      return;
    }
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 2, 90));
    }, 30);
    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 6500);
    return () => clearInterval(interval);
  }, []);

  // Button Handlers
  const handleDownload = (type: string) => {
    alert(`Download "${type}" will be available soon!`);
  };
  const handleStartModule = (module: string) => {
    alert(`Starting module: ${module} (feature coming soon).`);
  };
  const handleWatchTutorials = () => {
    window.open(
      "https://www.youtube.com/c/TraversyMedia/playlists?view=50&sort=dd&shelf_id=2",
      "_blank"
    );
  };
  const handleBrowseStarters = () => {
    window.open(
      "https://github.com/search?q=react+starter+template",
      "_blank"
    );
  };
  const handlePracticeCoding = () => {
    window.open("https://frontendmentor.io/challenges", "_blank");
  };
  const handleReadDocs = () => {
    window.open("https://react.dev/learn", "_blank");
  };
  const handleTryCloud = () => {
    window.open("https://vercel.com/", "_blank");
  };
  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(
      "Master modern web development (React, Node, SQL, DevOps & more) with this all-in-one hands-on course!"
    );
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    };
    window.open(urls[platform], "_blank", "width=600,height=400");
  };

  // const handleFrameworkClick = (framework: string) => {
  //   const frameworkUrls: Record<string, string> = {
  //     React: "https://react.dev/",
  //     "Vue.js": "https://vuejs.org/",
  //     Angular: "https://angular.io/",
  //     "Tailwind CSS": "https://tailwindcss.com/",
  //     Bootstrap: "https://getbootstrap.com/",
  //     "Node.js": "https://nodejs.org/",
  //     "Express.js": "https://expressjs.com/",
  //     Django: "https://www.djangoproject.com/",
  //     Flask: "https://flask.palletsprojects.com/",
  //     "Ruby on Rails": "https://rubyonrails.org/",
  //     Laravel: "https://laravel.com/",
  //     "Spring Boot": "https://spring.io/projects/spring-boot",
  //     "ASP.NET": "https://dotnet.microsoft.com/apps/aspnet",
  //     Svelte: "https://svelte.dev/",
  //     "Next.js": "https://nextjs.org/",
  //     "Nuxt.js": "https://nuxtjs.org/",
  //     Gatsby: "https://www.gatsbyjs.com/",
  //     Redux: "https://redux.js.org/",
  //     MobX: "https://mobx.js.org/",
  //     GraphQL: "https://graphql.org/",
  //     Apollo: "https://www.apollographql.com/",
  //     Prisma: "https://www.prisma.io/",
  //     TypeORM: "https://typeorm.io/",
  //     Sequelize: "https://sequelize.org/",
  //     MongoDB: "https://www.mongodb.com/",
  //     PostgreSQL: "https://www.postgresql.org/",
  //     MySQL: "https://www.mysql.com/",
  //     Firebase: "https://firebase.google.com/",
  //     AWS: "https://aws.amazon.com/",
  //     Azure: "https://azure.microsoft.com/",
  //     "Google Cloud": "https://cloud.google.com/",
  //     Docker: "https://www.docker.com/",
  //     Kubernetes: "https://kubernetes.io/",
  //     Jenkins: "https://www.jenkins.io/",
  //     Git: "https://git-scm.com/",
  //     GitHub: "https://github.com/",
  //     "VS Code": "https://code.visualstudio.com/",
  //     Webpack: "https://webpack.js.org/",
  //     Babel: "https://babeljs.io/",
  //     ESLint: "https://eslint.org/",
  //     Prettier: "https://prettier.io/",
  //     Jest: "https://jestjs.io/",
  //     Cypress: "https://www.cypress.io/",
  //     Playwright: "https://playwright.dev/",
  //     Sass: "https://sass-lang.com/",
  //     Less: "https://lesscss.org/",
  //     HTML5: "https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5",
  //     CSS3: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  //     JavaScript: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  //     TypeScript: "https://www.typescriptlang.org/",
  //     Python: "https://www.python.org/",
  //     Java: "https://www.java.com/",
  //     Ruby: "https://www.ruby-lang.org/",
  //     PHP: "https://www.php.net/",
  //     Go: "https://go.dev/",
  //     Swift: "https://swift.org/",
  //     Kotlin: "https://kotlinlang.org/",
  //     Flutter: "https://flutter.dev/",
  //     "React Native": "https://reactnative.dev/",
  //     Electron: "https://www.electronjs.org/",
  //     TensorFlow: "https://www.tensorflow.org/",
  //     PyTorch: "https://pytorch.org/",
  //     "Scikit-learn": "https://scikit-learn.org/",
  //     Pandas: "https://pandas.pydata.org/",
  //     NumPy: "https://numpy.org/",
  //     Matplotlib: "https://matplotlib.org/",
  //     "D3.js": "https://d3js.org/",
  //     "Three.js": "https://threejs.org/",
  //     Unity: "https://unity.com/",
  //     "Unreal Engine": "https://www.unrealengine.com/",
  //     Blender: "https://www.blender.org/",
  //     Figma: "https://www.figma.com/",
  //     "Adobe XD": "https://www.adobe.com/products/xd.html",
  //     Sketch: "https://www.sketch.com/",
  //     Canva: "https://www.canva.com/",
  //     WordPress: "https://wordpress.org/",
  //     Shopify: "https://www.shopify.com/",
  //     WooCommerce: "https://woocommerce.com/",
  //     Magento: "https://magento.com/",
  //     Joomla: "https://www.joomla.org/",
  //     Drupal: "https://www.drupal.org/",
  //     "Travis CI": "https://travis-ci.org/",
  //     CircleCI: "https://circleci.com/",
  //     GitLab: "https://about.gitlab.com/",
  //     Bitbucket: "https://bitbucket.org/",
  //     Terraform: "https://www.terraform.io/",
  //     Ansible: "https://www.ansible.com/",
  //     Puppet: "https://puppet.com/",
  //     Chef: "https://www.chef.io/",
  //     Vagrant: "https://www.vagrantup.com/",
  //     Prometheus: "https://prometheus.io/",
  //     Grafana: "https://grafana.com/",
  //     Elasticsearch: "https://www.elastic.co/elasticsearch/",
  //     Kibana: "https://www.elastic.co/kibana/",
  //     Logstash: "https://www.elastic.co/logstash/",
  //     RabbitMQ: "https://www.rabbitmq.com/",
  //     Kafka: "https://kafka.apache.org/",
  //     Redis: "https://redis.io/",
  //     Memcached: "https://memcached.org/",
  //     NGINX: "https://nginx.org/",
  //     Apache: "https://httpd.apache.org/",
  //     HAProxy: "https://www.haproxy.org/",
  //     Varnish: "https://varnish-cache.org/",
  //     OAuth: "https://oauth.net/",
  //     "OpenID Connect": "https://openid.net/connect/",
  //     SAML: "https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=security",
  //     JWT: "https://jwt.io/",
  //   };
  //   const url =
  //     frameworkUrls[framework] ||
  //     `https://www.google.com/search?q=${encodeURIComponent(
  //       framework
  //     )}+documentation`;
  //   window.open(url, "_blank");
  // };

  // Enhanced frameworks list with categories and logos
  const frameworksData = [
    // Frontend Frameworks
    {
      name: "React",
      category: "Frontend",
      logo: "⚛️",
      url: "https://react.dev/",
      color: "from-blue-400 to-cyan-500",
    },
    {
      name: "Vue.js",
      category: "Frontend",
      logo: "💚",
      url: "https://vuejs.org/",
      color: "from-green-400 to-emerald-500",
    },
    {
      name: "Angular",
      category: "Frontend",
      logo: "🅰️",
      url: "https://angular.io/",
      color: "from-red-400 to-pink-500",
    },
    {
      name: "Svelte",
      category: "Frontend",
      logo: "🔥",
      url: "https://svelte.dev/",
      color: "from-orange-400 to-red-500",
    },
    {
      name: "Next.js",
      category: "Frontend",
      logo: "▲",
      url: "https://nextjs.org/",
      color: "from-gray-700 to-gray-900",
    },
    {
      name: "Nuxt.js",
      category: "Frontend",
      logo: "💚",
      url: "https://nuxtjs.org/",
      color: "from-green-500 to-teal-600",
    },
    {
      name: "Gatsby",
      category: "Frontend",
      logo: "🟣",
      url: "https://www.gatsbyjs.com/",
      color: "from-purple-400 to-purple-600",
    },
    {
      name: "Remix",
      category: "Frontend",
      logo: "💿",
      url: "https://remix.run/",
      color: "from-blue-500 to-indigo-600",
    },

    // CSS Frameworks
    {
      name: "Tailwind CSS",
      category: "Design",
      logo: "🎨",
      url: "https://tailwindcss.com/",
      color: "from-cyan-400 to-blue-500",
    },
    {
      name: "Bootstrap",
      category: "Design",
      logo: "🅱️",
      url: "https://getbootstrap.com/",
      color: "from-purple-500 to-indigo-600",
    },
    {
      name: "Sass",
      category: "Design",
      logo: "💗",
      url: "https://sass-lang.com/",
      color: "from-pink-400 to-rose-500",
    },
    {
      name: "Material-UI",
      category: "Design",
      logo: "🎨",
      url: "https://mui.com/",
      color: "from-blue-400 to-indigo-500",
    },

    // Backend Frameworks
    {
      name: "Node.js",
      category: "Backend",
      logo: "🟢",
      url: "https://nodejs.org/",
      color: "from-green-500 to-lime-600",
    },
    {
      name: "Express.js",
      category: "Backend",
      logo: "🚂",
      url: "https://expressjs.com/",
      color: "from-gray-600 to-gray-800",
    },
    {
      name: "Django",
      category: "Backend",
      logo: "🎸",
      url: "https://www.djangoproject.com/",
      color: "from-green-600 to-teal-700",
    },
    {
      name: "Flask",
      category: "Backend",
      logo: "🧪",
      url: "https://flask.palletsprojects.com/",
      color: "from-gray-700 to-gray-900",
    },
    {
      name: "Ruby on Rails",
      category: "Backend",
      logo: "💎",
      url: "https://rubyonrails.org/",
      color: "from-red-500 to-rose-600",
    },
    {
      name: "Laravel",
      category: "Backend",
      logo: "🔴",
      url: "https://laravel.com/",
      color: "from-red-400 to-orange-500",
    },
    {
      name: "Spring Boot",
      category: "Backend",
      logo: "🍃",
      url: "https://spring.io/projects/spring-boot",
      color: "from-green-500 to-emerald-600",
    },
    {
      name: "ASP.NET",
      category: "Backend",
      logo: "🔵",
      url: "https://dotnet.microsoft.com/apps/aspnet",
      color: "from-blue-500 to-purple-600",
    },
    {
      name: "FastAPI",
      category: "Backend",
      logo: "⚡",
      url: "https://fastapi.tiangolo.com/",
      color: "from-teal-400 to-green-500",
    },
    {
      name: "NestJS",
      category: "Backend",
      logo: "🐱",
      url: "https://nestjs.com/",
      color: "from-red-500 to-pink-600",
    },

    // Databases
    {
      name: "MongoDB",
      category: "Database",
      logo: "🍃",
      url: "https://www.mongodb.com/",
      color: "from-green-500 to-emerald-600",
    },
    {
      name: "PostgreSQL",
      category: "Database",
      logo: "🐘",
      url: "https://www.postgresql.org/",
      color: "from-blue-500 to-indigo-600",
    },
    {
      name: "MySQL",
      category: "Database",
      logo: "🐬",
      url: "https://www.mysql.com/",
      color: "from-blue-400 to-cyan-500",
    },
    {
      name: "Redis",
      category: "Database",
      logo: "🔴",
      url: "https://redis.io/",
      color: "from-red-500 to-rose-600",
    },
    {
      name: "Firebase",
      category: "Database",
      logo: "🔥",
      url: "https://firebase.google.com/",
      color: "from-yellow-400 to-orange-500",
    },
    {
      name: "Supabase",
      category: "Database",
      logo: "⚡",
      url: "https://supabase.com/",
      color: "from-green-400 to-teal-500",
    },

    // DevOps Tools
    {
      name: "Docker",
      category: "DevOps",
      logo: "🐳",
      url: "https://www.docker.com/",
      color: "from-blue-400 to-cyan-500",
    },
    {
      name: "Kubernetes",
      category: "DevOps",
      logo: "☸️",
      url: "https://kubernetes.io/",
      color: "from-blue-500 to-indigo-600",
    },
    {
      name: "Jenkins",
      category: "DevOps",
      logo: "🤖",
      url: "https://www.jenkins.io/",
      color: "from-red-500 to-orange-600",
    },
    {
      name: "GitHub Actions",
      category: "DevOps",
      logo: "⚙️",
      url: "https://github.com/features/actions",
      color: "from-gray-700 to-gray-900",
    },
    {
      name: "GitLab CI",
      category: "DevOps",
      logo: "🦊",
      url: "https://about.gitlab.com/",
      color: "from-orange-500 to-red-600",
    },
    {
      name: "AWS",
      category: "DevOps",
      logo: "☁️",
      url: "https://aws.amazon.com/",
      color: "from-yellow-400 to-orange-500",
    },
    {
      name: "Azure",
      category: "DevOps",
      logo: "☁️",
      url: "https://azure.microsoft.com/",
      color: "from-blue-400 to-blue-600",
    },
    {
      name: "Google Cloud",
      category: "DevOps",
      logo: "☁️",
      url: "https://cloud.google.com/",
      color: "from-red-400 to-yellow-400",
    },
    {
      name: "Vercel",
      category: "DevOps",
      logo: "▲",
      url: "https://vercel.com/",
      color: "from-gray-900 to-black",
    },
    {
      name: "Netlify",
      category: "DevOps",
      logo: "🦋",
      url: "https://www.netlify.com/",
      color: "from-teal-400 to-cyan-500",
    },

    // Testing Tools
    {
      name: "Jest",
      category: "Testing",
      logo: "🃏",
      url: "https://jestjs.io/",
      color: "from-red-500 to-pink-600",
    },
    {
      name: "Cypress",
      category: "Testing",
      logo: "🌲",
      url: "https://www.cypress.io/",
      color: "from-green-400 to-emerald-500",
    },
    {
      name: "Playwright",
      category: "Testing",
      logo: "🎭",
      url: "https://playwright.dev/",
      color: "from-blue-400 to-indigo-500",
    },
    {
      name: "Vitest",
      category: "Testing",
      logo: "⚡",
      url: "https://vitest.dev/",
      color: "from-yellow-400 to-green-500",
    },

    // State Management
    {
      name: "Redux",
      category: "Frontend",
      logo: "🔮",
      url: "https://redux.js.org/",
      color: "from-purple-500 to-indigo-600",
    },
    {
      name: "MobX",
      category: "Frontend",
      logo: "🦊",
      url: "https://mobx.js.org/",
      color: "from-orange-400 to-red-500",
    },
    {
      name: "Zustand",
      category: "Frontend",
      logo: "🐻",
      url: "https://zustand-demo.pmnd.rs/",
      color: "from-gray-700 to-gray-900",
    },
    {
      name: "Recoil",
      category: "Frontend",
      logo: "⚛️",
      url: "https://recoiljs.org/",
      color: "from-blue-400 to-cyan-500",
    },

    // API Technologies
    {
      name: "GraphQL",
      category: "Backend",
      logo: "💗",
      url: "https://graphql.org/",
      color: "from-pink-500 to-rose-600",
    },
    {
      name: "Apollo",
      category: "Backend",
      logo: "🚀",
      url: "https://www.apollographql.com/",
      color: "from-indigo-500 to-purple-600",
    },
    {
      name: "tRPC",
      category: "Backend",
      logo: "🔷",
      url: "https://trpc.io/",
      color: "from-blue-500 to-cyan-600",
    },

    // ORM Tools
    {
      name: "Prisma",
      category: "Database",
      logo: "💎",
      url: "https://www.prisma.io/",
      color: "from-indigo-500 to-purple-600",
    },
    {
      name: "TypeORM",
      category: "Database",
      logo: "🔷",
      url: "https://typeorm.io/",
      color: "from-red-500 to-orange-600",
    },
    {
      name: "Sequelize",
      category: "Database",
      logo: "🐘",
      url: "https://sequelize.org/",
      color: "from-blue-400 to-indigo-500",
    },
    {
      name: "Drizzle",
      category: "Database",
      logo: "🌊",
      url: "https://orm.drizzle.team/",
      color: "from-green-400 to-teal-500",
    },

    // Build Tools
    {
      name: "Vite",
      category: "DevOps",
      logo: "⚡",
      url: "https://vitejs.dev/",
      color: "from-purple-500 to-pink-600",
    },
    {
      name: "Webpack",
      category: "DevOps",
      logo: "📦",
      url: "https://webpack.js.org/",
      color: "from-blue-400 to-cyan-500",
    },
    {
      name: "Rollup",
      category: "DevOps",
      logo: "📦",
      url: "https://rollupjs.org/",
      color: "from-red-400 to-orange-500",
    },
    {
      name: "Turbopack",
      category: "DevOps",
      logo: "⚡",
      url: "https://turbo.build/pack",
      color: "from-blue-500 to-purple-600",
    },

    // Version Control
    {
      name: "Git",
      category: "DevOps",
      logo: "🌿",
      url: "https://git-scm.com/",
      color: "from-orange-500 to-red-600",
    },
    {
      name: "GitHub",
      category: "DevOps",
      logo: "🐙",
      url: "https://github.com/",
      color: "from-gray-700 to-gray-900",
    },

    // Mobile Development
    {
      name: "React Native",
      category: "Frontend",
      logo: "📱",
      url: "https://reactnative.dev/",
      color: "from-blue-400 to-cyan-500",
    },
    {
      name: "Flutter",
      category: "Frontend",
      logo: "🦋",
      url: "https://flutter.dev/",
      color: "from-blue-400 to-indigo-500",
    },
    {
      name: "Ionic",
      category: "Frontend",
      logo: "⚡",
      url: "https://ionicframework.com/",
      color: "from-blue-500 to-cyan-600",
    },

    // Desktop Development
    {
      name: "Electron",
      category: "Frontend",
      logo: "⚛️",
      url: "https://www.electronjs.org/",
      color: "from-cyan-400 to-blue-500",
    },
    {
      name: "Tauri",
      category: "Frontend",
      logo: "🦀",
      url: "https://tauri.app/",
      color: "from-orange-400 to-yellow-500",
    },

    // CMS Platforms
    {
      name: "WordPress",
      category: "Backend",
      logo: "🔵",
      url: "https://wordpress.org/",
      color: "from-blue-500 to-indigo-600",
    },
    {
      name: "Strapi",
      category: "Backend",
      logo: "💜",
      url: "https://strapi.io/",
      color: "from-purple-500 to-indigo-600",
    },
    {
      name: "Contentful",
      category: "Backend",
      logo: "📝",
      url: "https://www.contentful.com/",
      color: "from-blue-400 to-cyan-500",
    },
    {
      name: "Sanity",
      category: "Backend",
      logo: "🎨",
      url: "https://www.sanity.io/",
      color: "from-red-400 to-pink-500",
    },

    // Design Tools
    {
      name: "Figma",
      category: "Design",
      logo: "🎨",
      url: "https://www.figma.com/",
      color: "from-purple-400 to-pink-500",
    },
    {
      name: "Adobe XD",
      category: "Design",
      logo: "🎨",
      url: "https://www.adobe.com/products/xd.html",
      color: "from-pink-500 to-purple-600",
    },
    {
      name: "Sketch",
      category: "Design",
      logo: "💎",
      url: "https://www.sketch.com/",
      color: "from-orange-400 to-yellow-500",
    },

    // Programming Languages
    {
      name: "JavaScript",
      category: "Backend",
      logo: "📜",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      color: "from-yellow-400 to-orange-500",
    },
    {
      name: "TypeScript",
      category: "Backend",
      logo: "🔷",
      url: "https://www.typescriptlang.org/",
      color: "from-blue-500 to-indigo-600",
    },
    {
      name: "Python",
      category: "Backend",
      logo: "🐍",
      url: "https://www.python.org/",
      color: "from-blue-400 to-yellow-400",
    },
    {
      name: "Go",
      category: "Backend",
      logo: "🐹",
      url: "https://go.dev/",
      color: "from-cyan-400 to-blue-500",
    },
    {
      name: "Rust",
      category: "Backend",
      logo: "🦀",
      url: "https://www.rust-lang.org/",
      color: "from-orange-500 to-red-600",
    },
    {
      name: "PHP",
      category: "Backend",
      logo: "🐘",
      url: "https://www.php.net/",
      color: "from-purple-500 to-indigo-600",
    },
    {
      name: "Java",
      category: "Backend",
      logo: "☕",
      url: "https://www.java.com/",
      color: "from-red-500 to-orange-600",
    },
    {
      name: "C#",
      category: "Backend",
      logo: "🎯",
      url: "https://docs.microsoft.com/en-us/dotnet/csharp/",
      color: "from-purple-500 to-blue-600",
    },

    // Package Managers
    {
      name: "npm",
      category: "DevOps",
      logo: "📦",
      url: "https://www.npmjs.com/",
      color: "from-red-500 to-rose-600",
    },
    {
      name: "Yarn",
      category: "DevOps",
      logo: "🧶",
      url: "https://yarnpkg.com/",
      color: "from-blue-400 to-cyan-500",
    },
    {
      name: "pnpm",
      category: "DevOps",
      logo: "📦",
      url: "https://pnpm.io/",
      color: "from-yellow-400 to-orange-500",
    },

    // Monitoring & Analytics
    {
      name: "Sentry",
      category: "DevOps",
      logo: "🔍",
      url: "https://sentry.io/",
      color: "from-purple-500 to-pink-600",
    },
    {
      name: "LogRocket",
      category: "DevOps",
      logo: "🚀",
      url: "https://logrocket.com/",
      color: "from-purple-400 to-indigo-500",
    },
    {
      name: "New Relic",
      category: "DevOps",
      logo: "📊",
      url: "https://newrelic.com/",
      color: "from-green-400 to-teal-500",
    },
  ];

  // AI Models and Tools
//   const aiModels = [
//     {
//       name: "GPT-4",
//       provider: "OpenAI",
//       logo: "🤖",
//       description: "Most advanced language model for complex tasks",
//       url: "https://openai.com/gpt-4",
//       color: "from-green-400 to-emerald-500",
//       pricing: "\$0.03/1K tokens",
//     },
//     {
//       name: "Claude 3.5 Sonnet",
//       provider: "Anthropic",
//       logo: "🧠",
//       description: "Balanced performance and efficiency",
//       url: "https://www.anthropic.com/",
//       color: "from-orange-400 to-red-500",
//       pricing: "\$3/\$15 per MTok",
//     },
//     {
//       name: "Gemini Pro",
//       provider: "Google",
//       logo: "✨",
//       description: "Multimodal AI with reasoning capabilities",
//       url: "https://deepmind.google/technologies/gemini/",
//       color: "from-blue-400 to-purple-500",
//       pricing: "Free tier available",
//     },
//     {
//       name: "Llama 3",
//       provider: "Meta",
//       logo: "🦙",
//       description: "Open-source foundation model",
//       url: "https://ai.meta.com/llama/",
//       color: "from-purple-400 to-pink-500",
//       pricing: "Free (Open Source)",
//     },
//     {
//       name: "Mistral AI",
//       provider: "Mistral",
//       logo: "🌪️",
//       description: "European AI with strong performance",
//       url: "https://mistral.ai/",
//       color: "from-indigo-400 to-blue-500",
//       pricing: "€0.25/M tokens",
//     },
//     {
//       name: "Stable Diffusion",
//       provider: "Stability AI",
//       logo: "🎨",
//       description: "Text-to-image generation model",
//       url: "https://stability.ai/",
//       color: "from-pink-400 to-rose-500",
//       pricing: "Free (Open Source)",
//     },
//     {
//       name: "DALL-E 3",
//       provider: "OpenAI",
//       logo: "🖼️",
//       description: "Advanced image generation from text",
//       url: "https://openai.com/dall-e-3",
//       color: "from-cyan-400 to-blue-500",
//       pricing: "\$0.040/image (1024×1024)",
//     },
//     {
//       name: "Midjourney",
//       provider: "Midjourney",
//       logo: "🌈",
//       description: "AI art generation platform",
//       url: "https://www.midjourney.com/",
//       color: "from-purple-500 to-pink-600",
//       pricing: "\$10-60/month",
//     },
//     {
//       name: "Copilot",
//       provider: "GitHub",
//       logo: "💻",
//       description: "AI pair programmer for coding",
//       url: "https://github.com/features/copilot",
//       color: "from-gray-700 to-gray-900",
//       pricing: "\$10/month",
//     },
//     {
//       name: "Claude Opus",
//       provider: "Anthropic",
//       logo: "🎭",
//       description: "Top-tier model for complex analysis",
//       url: "https://www.anthropic.com/",
//       color: "from-red-500 to-orange-600",
//       pricing: "\$15/\$75 per MTok",
//     },
//     {
//       name: "ChatGPT Plus",
//       provider: "OpenAI",
//       logo: "⚡",
//       description: "Enhanced ChatGPT with GPT-4 access",
//       url: "https://openai.com/chatgpt",
//       color: "from-green-500 to-teal-600",
//       pricing: "\$20/month",
//     },
//     {
//       name: "Bard",
//       provider: "Google",
//       logo: "🎵",
//       description: "Conversational AI assistant",
//       url: "https://bard.google.com/",
//       color: "from-blue-400 to-indigo-500",
//       pricing: "Free",
//     },
//   ];

// AI Models and Tools - Updated with amber colors
const aiModels = [
  {
    name: "GPT-4",
    provider: "OpenAI",
    logo: "🤖",
    description: "Most advanced language model for complex tasks",
    url: "https://openai.com/gpt-4",
    color: "from-amber-400 to-orange-500",
    pricing: "\$0.03/1K tokens",
  },
  {
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    logo: "🧠",
    description: "Balanced performance and efficiency",
    url: "https://www.anthropic.com/",
    color: "from-orange-400 to-red-500",
    pricing: "\$3/\$15 per MTok",
  },
  {
    name: "Gemini Pro",
    provider: "Google",
    logo: "✨",
    description: "Multimodal AI with reasoning capabilities",
    url: "https://deepmind.google/technologies/gemini/",
    color: "from-amber-500 to-orange-600",
    pricing: "Free tier available",
  },
  {
    name: "Llama 3",
    provider: "Meta",
    logo: "🦙",
    description: "Open-source foundation model",
    url: "https://ai.meta.com/llama/",
    color: "from-yellow-400 to-orange-500",
    pricing: "Free (Open Source)",
  },
  {
    name: "Mistral AI",
    provider: "Mistral",
    logo: "🌪️",
    description: "European AI with strong performance",
    url: "https://mistral.ai/",
    color: "from-orange-400 to-red-500",
    pricing: "€0.25/M tokens",
  },
  {
    name: "Stable Diffusion",
    provider: "Stability AI",
    logo: "🎨",
    description: "Text-to-image generation model",
    url: "https://stability.ai/",
    color: "from-amber-400 to-yellow-500",
    pricing: "Free (Open Source)",
  },
  {
    name: "DALL-E 3",
    provider: "OpenAI",
    logo: "🖼️",
    description: "Advanced image generation from text",
    url: "https://openai.com/dall-e-3",
    color: "from-yellow-500 to-orange-600",
    pricing: "\$0.040/image (1024×1024)",
  },
  {
    name: "Midjourney",
    provider: "Midjourney",
    logo: "🌈",
    description: "AI art generation platform",
    url: "https://www.midjourney.com/",
    color: "from-orange-500 to-red-600",
    pricing: "\$10-60/month",
  },
  {
    name: "Copilot",
    provider: "GitHub",
    logo: "💻",
    description: "AI pair programmer for coding",
    url: "https://github.com/features/copilot",
    color: "from-gray-700 to-amber-600",
    pricing: "\$10/month",
  },
  {
    name: "Claude Opus",
    provider: "Anthropic",
    logo: "🎭",
    description: "Top-tier model for complex analysis",
    url: "https://www.anthropic.com/",
    color: "from-red-500 to-orange-600",
    pricing: "\$15/\$75 per MTok",
  },
  {
    name: "ChatGPT Plus",
    provider: "OpenAI",
    logo: "⚡",
    description: "Enhanced ChatGPT with GPT-4 access",
    url: "https://openai.com/chatgpt",
    color: "from-amber-500 to-yellow-600",
    pricing: "\$20/month",
  },
  {
    name: "Bard",
    provider: "Google",
    logo: "🎵",
    description: "Conversational AI assistant",
    url: "https://bard.google.com/",
    color: "from-yellow-400 to-amber-500",
    pricing: "Free",
  },
];

  // Categories for filtering
  const categories = [
    "All",
    "Frontend",
    "Backend",
    "Database",
    "DevOps",
    "Testing",
    "Design",
  ];

  // Filter frameworks based on selected category
  const filteredFrameworks =
    selectedCategory === "All"
      ? frameworksData
      : frameworksData.filter((fw) => fw.category === selectedCategory);

  // KEYFRAME ANIMATIONS
  const keyframes = `
    @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0);} }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes scaleIn { from { opacity: 0; transform: scale(0.9);} to{opacity:1;transform:scale(1);} }
    @keyframes pulse-slow { 0%,100%{ opacity:0.6;} 50%{opacity:1;} }
    @keyframes bounce-gentle { 0%,100%{ transform: translateY(-25%) translateX(-50%);} 50%{ transform: translateY(0) translateX(-50%);} }
    .animate-float { animation: float 3s ease-in-out infinite;}
    .animate-slide-up { animation: slideUp 0.6s ease-out;}
    .animate-fade-in { animation: fadeIn 0.8s;}
    .animate-scale-in { animation: scaleIn 0.5s;}
    .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite;}
    .animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite;}
    .stagger-1{animation-delay:0.1s;}
    .stagger-2{animation-delay:0.2s;}
    .stagger-3{animation-delay:0.3s;}
    .stagger-4{animation-delay:0.4s;}
    .stagger-5{animation-delay:0.5s;}
    .stagger-6{animation-delay:0.6s;}
  `;

  // --- LOADING SCREEN ---
  if (isLoading) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-amber-50 via-gray-100 to-amber-100 flex items-center justify-center px-6"
        aria-busy="true"
        aria-live="polite"
      >
        <div className="w-full max-w-sm rounded-2xl border border-amber-200/60 bg-white/60 backdrop-blur-xl shadow-lg p-8">
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-2 border-amber-200" />
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-orange-500 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Monitor className="w-7 h-7 text-amber-600 animate-bounce" />
              </div>
            </div>
            <p className="mt-6 text-lg font-semibold text-gray-800">
              Loading Web Dev Course
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Compiling components...
            </p>
            <div
              className="mt-6 w-full h-3 rounded-full bg-amber-100/80 overflow-hidden relative"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-amber-800">
                {progress}%
              </span>
            </div>
            <div className="mt-4 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-bounce [animation-delay:150ms]" />
              <span className="w-2 h-2 rounded-full bg-red-500 animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-gray-100 to-amber-100">
      <style>{keyframes}</style>

      {/* ------------------------- HERO SECTION ------------------------- */}
      <section className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 overflow-hidden min-h-[60vh] sm:min-h-[70vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-24 left-14 w-56 sm:w-80 h-56 sm:h-80 bg-amber-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div
            className="absolute top-40 right-12 w-72 sm:w-[30rem] h-64 sm:h-[25rem] bg-orange-300/20 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-16 left-1/4 w-44 sm:w-72 h-44 sm:h-72 bg-yellow-300/20 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in">
            <div className="mb-6 sm:mb-8 flex justify-center">
              <div className="relative group animate-float">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-red-800 rounded-xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-orange-500 to-red-700 p-6 sm:p-8 rounded-2xl shadow-2xl">
                  <Monitor className="w-12 h-12 sm:w-16 sm:h-16 text-white animate-bounce" />
                </div>
              </div>
            </div>
            <Badge className="mb-4 sm:mb-6 bg-orange-500/20 text-orange-900 border-orange-400/20 px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base md:text-lg animate-scale-in">
              Build Apps. Launch Careers. Shape the Web.
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-amber-700 via-orange-600 to-red-700 bg-clip-text text-transparent px-4 animate-slide-up">
              Master Modern Web Development
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-10 leading-relaxed max-w-3xl mx-auto px-4 animate-slide-up stagger-1">
              Become a full-stack engineer with hands-on projects, real-world
              workflows, and career-focused preparation in React, Node.js, SQL &
              DevOps.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-10 px-4 animate-slide-up stagger-2">
              <Button
                size="lg"
                onClick={() =>
                  window.scrollTo({
                    top:
                      document.getElementById("beginner-timeline")!.offsetTop -
                      80,
                    behavior: "smooth",
                  })
                }
                className="w-full sm:w-auto bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg group"
              >
                Start Learning
                <Rocket className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-amber-400 text-amber-700 hover:bg-amber-50 backdrop-blur-sm bg-white/50 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg group"
                >
                  Preview Labs
                  <Terminal className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto px-4">
              {[
                { icon: Code, label: "Real Projects", value: "15+" },
                { icon: Users, label: "Graduates", value: "7800+" },
                { icon: Trophy, label: "Tech Interviews", value: "500+" },
                { icon: Star, label: "Avg. Rating", value: "4.92/5" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`bg-white/70 backdrop-blur-md rounded-xl p-4 border border-amber-200 hover:bg-white/80 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-slide-up stagger-${
                    index + 3
                  }`}
                >
                  <stat.icon className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                  <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-amber-800 text-xs sm:text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle hidden sm:block">
          <div className="w-6 h-10 border-2 border-amber-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-amber-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* --------------------- WHY WEB DEV -------------------- */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-10 sm:mb-14 animate-slide-up">
            <Badge className="mb-4 bg-amber-100 text-amber-700 border-amber-200 px-4 py-2 text-base">
              Why Web Dev?
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 px-4">
              The Most In-Demand Skillset of the Decade
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              From billion-user apps to local startups—web development powers
              the digital world. Learn the workflow, deployment, and
              architecture the pros use.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Smartphone,
                title: "Frontend Magic",
                description:
                  "Deliver beautiful, interactive UIs for any device. Learn component-based React, CSS frameworks & web animations. Explore themes like responsive design, accessibility, and performance optimization to create user-friendly experiences that captivate audiences across platforms.",
                color: "from-amber-400 to-orange-500",
                badge: "User Experience",
              },
              {
                icon: Server,
                title: "Backend Power",
                description:
                  "Create reliable, scalable APIs and servers with Node.js, Express, and databases—from REST basics to authentication and real data. Dive into server-side logic, data management, security protocols, and efficient query handling to build robust backends that support high-traffic applications.",
                color: "from-orange-400 to-red-500",
                badge: "APIs & Databases",
              },
              {
                icon: Cloud,
                title: "DevOps & Cloud",
                description:
                  "Deploy your apps to the web. Automate builds, CI/CD, use Docker, and understand serverless/cloud workflows for production-scale delivery. Master containerization, orchestration, monitoring, and scaling strategies to ensure your applications run smoothly in cloud environments like AWS or Azure.",
                color: "from-yellow-400 to-orange-500",
                badge: "Professional Launch",
              },
              {
                icon: Monitor,
                title: "Fullstack Problem-Solver",
                description:
                  "Solve end-to-end problems, debug across layers, ship ideas from database to browser. Integrate frontend and backend seamlessly, handle data flow, manage state, and troubleshoot issues in a holistic manner to deliver complete, functional web solutions.",
                color: "from-amber-400 to-red-500",
                badge: "Fullstack",
              },
              {
                icon: Bug,
                title: "Real Debugging Skills",
                description:
                  "Master Chrome DevTools, VS Code & best practices for tracking, testing, and fixing real production issues. Learn advanced debugging techniques, error handling, logging, and performance profiling to maintain high-quality, reliable codebases over time.",
                color: "from-red-400 to-pink-500",
                badge: "Troubleshooting",
              },
              {
                icon: Briefcase,
                title: "Career Versatility",
                description:
                  "Open doors to freelance, startups, big tech, and remote careers. Build your digital portfolio and get noticed. Develop skills in networking, resume building, interview preparation, and personal branding to accelerate your career in the dynamic tech industry.",
                color: "from-orange-400 to-yellow-500",
                badge: "Hiring Edge",
              },
            ].map((feature, idx) => (
              <Card
                key={idx}
                className={`group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-2 border-gray-100 hover:border-amber-200 bg-white/80 backdrop-blur-sm animate-slide-up stagger-${
                  idx + 1
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} p-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}
                    >
                      <feature.icon className="w-full h-full text-white" />
                    </div>
                    <Badge className="bg-amber-50 text-amber-800 border-amber-200 text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-bold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------- FULL-STACK ROADMAP (TWO TIMELINES) ----------------------------------- */}
      <section
        id="beginner-timeline"
        className="py-12 sm:py-16 md:py-20 px-4 sm:px-6"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 sm:mb-16 md:mb-20 animate-slide-up">
            <Badge className="mb-3 sm:mb-4 bg-amber-100 text-amber-700 border-amber-200 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base">
              Roadmap
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-4">
              The Journey from Zero to Production
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Two clear timelines: One for new devs. One for building, launching
              and scaling real projects. Each phase is designed with practical
              exercises, quizzes, and projects to reinforce learning and ensure
              retention of key concepts.
            </p>
          </div>
          {/* --- TIMELINE 1: FOR BEGINNERS & CAREER-CHANGERS --- */}
          <div className="mb-16">
            <h3 className="text-center text-xl sm:text-2xl font-bold text-amber-900 mb-8 animate-fade-in">
              Phase 1: "Job-Ready" Junior Developer Timeline
            </h3>
            <div className="relative mb-20">
              {/* Vertical timeline */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-amber-400 to-orange-400 rounded-full hidden md:block"></div>
              <div className="space-y-12">
                {[
                  {
                    title: "Week 1-2: The Web & HTML/CSS",
                    icon: <Chrome className="w-6 h-6 text-white" />,
                    color: "from-orange-500 to-red-500",
                    items: [
                      "Internet & HTTP basics",
                      "Semantic HTML",
                      "Responsive Layouts (Flex, Grid)",
                      "Modern CSS (variables, selectors, mobile-first)",
                    ],
                  },
                  {
                    title: "Week 3-4: JavaScript Core",
                    icon: <Code className="w-6 h-6 text-white" />,
                    color: "from-yellow-400 to-orange-500",
                    items: [
                      "ES6+ Syntax, Arrow Functions",
                      "DOM Manipulation",
                      "Events, Forms",
                      "APIs & Fetch",
                    ],
                  },
                  {
                    title: "Week 5-7: React Foundations",
                    icon: <Monitor className="w-6 h-6 text-white" />,
                    color: "from-amber-500 to-orange-600",
                    items: [
                      "Components & Props",
                      "Hooks (useState, useEffect)",
                      "Passing Data & Props Drilling",
                      "Component Styling Techniques",
                    ],
                  },
                  {
                    title: "Week 8-10: Version Control & Deployment",
                    icon: <GitBranch className="w-6 h-6 text-white" />,
                    color: "from-red-500 to-pink-500",
                    items: [
                      "Git Workflow (branch, pull, merge)",
                      "GitHub Projects",
                      "Static Hosting (Vercel/Netlify)",
                      "Portfolio Starter Site",
                    ],
                  },
                  {
                    title: "Week 11-12: Essential Projects",
                    icon: <Puzzle className="w-6 h-6 text-white" />,
                    color: "from-orange-500 to-yellow-600",
                    items: [
                      "Build a To-Do List",
                      "Create a Responsive Blog Home",
                      "Create a React Quiz App",
                    ],
                  },
                ].map((step, index) => (
                  <div
                    key={index}
                    className={`flex flex-col md:flex-row items-center ${
                      index % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <div className="hidden md:flex relative z-10 justify-center items-center w-10 h-10 rounded-full bg-white border-4 border-amber-500 mx-4 flex-shrink-0">
                      <div
                        className={`w-3 h-3 rounded-full bg-gradient-to-r ${step.color}`}
                      ></div>
                    </div>
                    <Card
                      className={`w-full md:w-1/2 bg-white/80 backdrop-blur-sm border-2 border-gray-100 hover:border-amber-200 transition-all duration-300 animate-slide-up ${
                        index % 2 === 0
                          ? "md:pr-8 md:text-right md:ml-auto md:w-1/2"
                          : "md:pl-8 md:text-left md:mr-auto md:w-1/2"
                      }`}
                    >
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg`}
                          >
                            {step.icon}
                          </div>
                          <CardTitle className="text-lg font-bold text-gray-900">
                            {step.title}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {step.items.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-center text-sm text-gray-600"
                            >
                              <CheckCircle2 className="w-4 h-4 text-amber-500 mr-2 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4"
                          onClick={() => handleStartModule(step.title)}
                        >
                          Start Phase
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* --- TIMELINE 2: PRODUCTION ENGINEER WORKFLOW --- */}
          <div className="mb-16">
            <h3 className="text-center text-xl sm:text-2xl font-bold text-red-900 mb-8 animate-fade-in">
              Phase 2: "Shipping Real Apps" Advanced Timeline
            </h3>
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-red-400 to-pink-400 rounded-full hidden md:block"></div>
              <div className="space-y-12">
                {[
                  {
                    title: "Month 1: Fullstack Setup & Environment",
                    icon: <ServerCog className="w-6 h-6 text-white" />,
                    color: "from-red-500 to-pink-500",
                    items: [
                      "Node.js & Express server",
                      "REST API endpoints",
                      "CORS & HTTP Best Practices",
                      "Connecting to MongoDB & PostgreSQL",
                    ],
                  },
                  {
                    title: "Month 2: Authentication & Security",
                    icon: <Shield className="w-6 h-6 text-white" />,
                    color: "from-orange-500 to-red-500",
                    items: [
                      "JWT Authentication",
                      "OAuth (Google, GitHub)",
                      "Password Hashing & Security",
                      "Rate Limiting, HTTPS, CORS",
                    ],
                  },
                  {
                    title: "Month 3: Advanced React & SPA Patterns",
                    icon: <Monitor className="w-6 h-6 text-white" />,
                    color: "from-amber-500 to-orange-600",
                    items: [
                      "React Router v6+",
                      "Data Fetching (SWR, Redux Toolkit Query)",
                      "Optimistic UI, Suspense",
                      "Testing Components (Jest, RTL)",
                    ],
                  },
                  {
                    title: "Month 4: Testing & Deploying",
                    icon: <CloudRain className="w-6 h-6 text-white" />,
                    color: "from-yellow-500 to-orange-600",
                    items: [
                      "Jest & SuperTest (API tests)",
                      "E2E with Playwright/Cypress",
                      "Docker for Local Dev",
                      "CI/CD (GitHub Actions)",
                    ],
                  },
                  {
                    title: "Month 5-6: Scale, Monitor, and Polish",
                    icon: <Activity className="w-6 h-6 text-white" />,
                    color: "from-red-500 to-pink-600",
                    items: [
                      "Logging & Monitoring (Sentry, Vercel Analytics)",
                      "Code Splitting & Lazy Loading",
                      "Performance Profiling",
                      "SEO & Accessibility (A11y)",
                    ],
                  },
                  {
                    title: "Capstone: Launch App!",
                    icon: <Rocket className="w-6 h-6 text-white" />,
                    color: "from-pink-500 to-red-700",
                    items: [
                      "Ship a live fullstack project",
                      "Bonus: Payment, Email integrations",
                      "Live domain, error logging, user feedback",
                    ],
                  },
                ].map((step, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col md:flex-row items-center ${
                      idx % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <div className="hidden md:flex relative z-10 justify-center items-center w-10 h-10 rounded-full bg-white border-4 border-red-500 mx-4 flex-shrink-0">
                      <div
                        className={`w-3 h-3 rounded-full bg-gradient-to-r ${step.color}`}
                      ></div>
                    </div>
                    <Card
                      className={`w-full md:w-1/2 bg-white/80 backdrop-blur-sm border-2 border-gray-100 hover:border-red-200 transition-all duration-300 animate-slide-up ${
                        idx % 2 === 0
                          ? "md:pr-8 md:text-right md:ml-auto md:w-1/2"
                          : "md:pl-8 md:text-left md:mr-auto md:w-1/2"
                      }`}
                    >
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg`}
                          >
                            {step.icon}
                          </div>
                          <CardTitle className="text-lg font-bold text-gray-900">
                            {step.title}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {step.items.map((item, idx2) => (
                            <li
                              key={idx2}
                              className="flex items-center text-sm text-gray-600"
                            >
                              <CheckCircle2 className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4"
                          onClick={() => handleStartModule(step.title)}
                        >
                          Start Step
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 text-center animate-slide-up">
            <Button
              size="lg"
              onClick={() => handleDownload("Web Dev Learning Roadmap PDF")}
              className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Full Curriculum Roadmap
            </Button>
          </div>
        </div>
      </section>

      {/* ------------------------ WEBDEV CONCEPTS ---------------------------- */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 animate-slide-up">
            <Badge className="mb-3 bg-amber-100 text-amber-700 border-amber-200 px-4 py-2 text-base">
              Core Concepts
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 px-4">
              Everything a Modern Web Engineer Uses
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Key building blocks: what you'll use, debug, and ship every day on
              the job.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {[
              {
                icon: Code,
                title: "React & SPA",
                desc: "Modern JS frameworks and single page routing.",
                color: "from-amber-500 to-orange-600",
              },
              {
                icon: Database,
                title: "Databases",
                desc: "SQL (Postgres, MySQL) & NoSQL (Mongo, Redis) design & queries.",
                color: "from-orange-500 to-red-600",
              },
              {
                icon: Server,
                title: "API Servers",
                desc: "REST, GraphQL, authentication & API structure.",
                color: "from-red-500 to-pink-600",
              },
              {
                icon: Cloud,
                title: "Deployment",
                desc: "Cloud, Docker, CI/CD pipelines, live domains.",
                color: "from-yellow-500 to-orange-600",
              },
              {
                icon: Eye,
                title: "Accessibility (A11y)",
                desc: "Build apps inclusive of all users.",
                color: "from-green-500 to-emerald-600",
              },
              {
                icon: Brush,
                title: "CSS/UI",
                desc: "Tailwind, animation, CSS-in-JS, Design Systems.",
                color: "from-pink-500 to-red-500",
              },
              {
                icon: Shield,
                title: "Security",
                desc: "HTTPS, JWTs, XSS, CORS, secure auth flows.",
                color: "from-red-500 to-pink-600",
              },
              {
                icon: BarChart,
                title: "Testing",
                desc: "Unit, Integration, E2E. Test-driven workflows.",
                color: "from-orange-500 to-yellow-600",
              },
            ].map((concept, idx) => (
              <Card
                key={idx}
                className={`group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-2 border-gray-100 hover:border-amber-200 animate-slide-up stagger-${
                  idx + 1
                }`}
              >
                <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-gradient-to-r ${concept.color} p-3 mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg mx-auto`}
                  >
                    <concept.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1 sm:mb-2 text-center">
                    {concept.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 text-center leading-relaxed">
                    {concept.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------- RESOURCES ------------------------------ */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-10 animate-slide-up">
            <Badge className="mb-3 bg-amber-100 text-amber-700 border-amber-200 px-4 py-2 text-base">
              Tools & Resources
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 px-4">
              Supercharge Your Learning
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Practice on real platforms, see code walkthroughs, grab starter
              kits, ship projects, and deploy to the cloud.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                icon: Video,
                title: "Fullstack Video Tutorials",
                description:
                  "See step-by-step builds for React, Node, API, SQL, and UI from scratch—beginner to pro.",
                items: [
                  "20+ hands-on projects",
                  "Front + Back walkthroughs",
                  "Modern patterns explained",
                ],
                buttonText: "Watch Videos",
                buttonIcon: Play,
                gradient: "from-amber-500 to-red-500",
                action: handleWatchTutorials,
              },
              {
                icon: FileCode,
                title: "React+Node Starters",
                description:
                  "Grab production-grade templates and deploy-ready boilerplate to save hours on setup.",
                items: [
                  "Auth ready",
                  "API + DB integrated",
                  "Next.js & REST examples",
                ],
                buttonText: "See Starters",
                buttonIcon: Code,
                gradient: "from-green-500 to-emerald-600",
                action: handleBrowseStarters,
              },
              {
                icon: Puzzle,
                title: "Frontend Challenges",
                description:
                  "Practice with real-world design files (Figma), work with APIs, start career-building portfolio work.",
                items: [
                  "FrontendMentor, DevChallenges",
                  "Design-to-code",
                  "Showcase portfolio feedback",
                ],
                buttonText: "Start Practice",
                buttonIcon: Target,
                gradient: "from-orange-500 to-yellow-500",
                action: handlePracticeCoding,
              },
              {
                icon: BookMarked,
                title: "Official Docs Library",
                description:
                  "Get the best docs, API guides, and cheat sheets for React, Express, Postgres, Cloud & more.",
                items: [
                  "React/Node official docs",
                  "JS/TS cheat sheets",
                  "VS Code tips",
                ],
                buttonText: "Browse Docs",
                buttonIcon: BookOpen,
                gradient: "from-yellow-400 to-orange-600",
                action: handleReadDocs,
              },
              {
                icon: Cloud,
                title: "Free Cloud Deployments",
                description:
                  "Push your app to the real web with live domains: Vercel, Render and more.",
                items: [
                  "CI/CD built-in",
                  "SSL included",
                  "Remote DB options",
                ],
                buttonText: "Try Hosting",
                buttonIcon: ExternalLink,
                gradient: "from-red-500 to-pink-500",
                action: handleTryCloud,
              },
              {
                icon: Download,
                title: "Web Dev Cheat Sheets",
                description:
                  "Download printable PDFs: Command-line, React Hooks, CSS grid, regex, Git & more.",
                items: [
                  "10+ skill sheets",
                  "MVC & API diagrams",
                  "Best practices quick ref",
                ],
                buttonText: "Download",
                buttonIcon: Download,
                gradient: "from-orange-500 to-red-500",
                action: () => handleDownload("WebDev Cheat Sheets"),
              },
            ].map((resource, idx) => (
              <Card
                key={idx}
                className={`group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-2 border-gray-100 hover:border-amber-200 animate-slide-up stagger-${
                  idx + 1
                }`}
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-r ${resource.gradient} p-3 mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}
                  >
                    <resource.icon className="w-full h-full text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-bold text-gray-900">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4 sm:mb-6">
                    {resource.items.map((item, itemidx) => (
                      <li
                        key={itemidx}
                        className="flex items-center text-xs text-gray-600"
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={resource.action}
                    className={`w-full bg-gradient-to-r ${resource.gradient} hover:shadow-lg transition-all duration-300 group text-sm`}
                  >
                    {resource.buttonText}
                    <resource.buttonIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------- CAREERS ----------------------------- */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-10 animate-slide-up">
            <Badge className="mb-4 bg-green-100 text-green-700 border-green-200 px-4 py-2 text-base">
              Career Paths
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 px-4">
              Where a Web Dev Skillset Can Take You
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              The #1 path to six-figure salaries, remote freedom, startups,
              product teams, and creative tech roles.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Frontend Engineer",
                companies: [
                  "Meta",
                  "Shopify",
                  "Vercel",
                  "Stripe",
                  "Agency Startups",
                ],
                salary: "$108K - $220K",
                icon: "🎨",
                color: "border-amber-300 hover:border-amber-500",
                description:
                  "UI/UX implementation, performance, accessibility, animation work.",
              },
              {
                title: "Backend Engineer",
                companies: [
                  "Netflix",
                  "Plaid",
                  "Amazon",
                  "MongoDB",
                  "Booking",
                ],
                salary: "$115K - $250K",
                icon: "🗄️",
                color: "border-orange-300 hover:border-orange-500",
                description:
                  "APIs, databases, security, scale, automation, data pipelines.",
              },
              {
                title: "Full-Stack Developer",
                companies: [
                  "Airbnb",
                  "Notion",
                  "Spotify",
                  "Apple",
                  "Remote SaaS teams",
                ],
                salary: "$120K - $260K",
                icon: "🌐",
                color: "border-red-300 hover:border-red-500",
                description:
                  "Own features end-to-end: code, ship, debug, refactor, deploy.",
              },
              {
                title: "DevOps/Cloud Engineer",
                companies: [
                  "AWS",
                  "Vercel",
                  "Heroku",
                  "Google Cloud",
                  "DigitalOcean",
                ],
                salary: "$110K - $230K",
                icon: "☁️",
                color: "border-yellow-300 hover:border-yellow-500",
                description:
                  "CI/CD, infrastructure, monitoring, scaling, serverless deployments.",
              },
              {
                title: "Freelancer/Consultant",
                companies: [
                  "Self-employed",
                  "Boutique agencies",
                  "Remote platforms",
                  "Upwork",
                ],
                salary: "\$60/hr - \$180/hr",
                icon: "🧑‍💻",
                color: "border-orange-300 hover:border-orange-500",
                description:
                  "Client work, custom builds, startups, business web launches.",
              },
              {
                title: "Product/Tech Lead",
                companies: [
                  "Scaleups",
                  "Big Tech",
                  "Open Source Startups",
                  "R&D",
                ],
                salary: "$150K - $320K",
                icon: "💡",
                color: "border-red-300 hover:border-red-500",
                description:
                  "Mentor & lead, architecture, team workflows, roadmap ownership.",
              },
            ].map((career, idx) => (
              <Card
                key={idx}
                className={`group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-2 ${
                  career.color
                } animate-slide-up stagger-${idx + 1}`}
              >
                <CardHeader>
                  <div className="text-4xl mb-3">{career.icon}</div>
                  <CardTitle className="text-lg sm:text-xl font-bold text-gray-900">
                    {career.title}
                  </CardTitle>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2">
                    {career.description}
                  </p>
                  <Badge className="bg-amber-100 text-amber-700 border-amber-200 w-fit text-xs">
                    {career.salary}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 font-semibold">
                    Top Companies:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {career.companies.map((company, idx2) => (
                      <Badge
                        key={idx2}
                        variant="outline"
                        className="bg-gray-50 text-xs"
                      >
                        {company}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------- FRAMEWORK FILTER & DISPLAY ----------------------- */}
<section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
  <div className="container mx-auto max-w-7xl">
    <div className="text-center mb-10 animate-slide-up">
      <Badge className="mb-4 bg-amber-100 text-amber-700 border-amber-200 px-4 py-2 text-base flex items-center gap-2 w-fit mx-auto">
        <Sparkles className="w-4 h-4" />
        Framework Library
      </Badge>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 px-4">
        100+ Technologies at Your Fingertips
      </h2>
      <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4 mb-8">
        Explore the tools that power modern web development. Click any
        technology to access official docs, tutorials, and resources.
      </p>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            className={`transition-all duration-300 ${
              selectedCategory === category
                ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg scale-105"
                : "border-amber-300 text-amber-700 hover:bg-amber-50"
            }`}
          >
            <Filter className="w-4 h-4 mr-2" />
            {category}
            <Badge
              variant="secondary"
              className="ml-2 bg-white/20 text-xs"
            >
              {category === "All"
                ? frameworksData.length
                : frameworksData.filter((fw) => fw.category === category)
                    .length}
            </Badge>
          </Button>
        ))}
      </div>
    </div>

    {/* Frameworks Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {filteredFrameworks.map((framework, idx) => (
        <Card
          key={idx}
          onClick={() => window.open(framework.url, "_blank")}
          className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer bg-white/80 backdrop-blur-sm border-2 border-gray-100 hover:border-amber-300 animate-scale-in"
          style={{ animationDelay: `${idx * 0.03}s` }}
        >
          <CardContent className="p-4 text-center">
            <div
              className={`w-16 h-16 mx-auto rounded-xl bg-gradient-to-r ${framework.color} flex items-center justify-center text-3xl mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}
            >
              {framework.logo}
            </div>
            <h3 className="text-sm font-bold text-gray-900 mb-1">
              {framework.name}
            </h3>
            <Badge
              variant="outline"
              className="text-xs bg-amber-50 border-amber-200 text-amber-700"
            >
              {framework.category}
            </Badge>
            <Button
              size="sm"
              variant="ghost"
              className="mt-3 w-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              Learn More
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>

    <div className="mt-8 text-center text-gray-600 text-sm">
      Showing {filteredFrameworks.length} of {frameworksData.length}{" "}
      technologies
    </div>
  </div>
</section>


{/* ---------------------- AI MODELS SECTION ----------------------- */}
<section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-br from-amber-50 via-white to-orange-50">
  <div className="container mx-auto max-w-7xl">
    <div className="text-center mb-10 animate-slide-up">
      <Badge className="mb-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 text-base flex items-center gap-2 w-fit mx-auto">
        <Brain className="w-4 h-4" />
        AI-Powered Development
      </Badge>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 px-4">
        Modern AI Tools for Developers
      </h2>
      <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
        Supercharge your workflow with AI assistants, code generation, and
        automation tools trusted by top developers worldwide.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {aiModels.map((model, idx) => (
        <Card
          key={idx}
          onClick={() => window.open(model.url, "_blank")}
          className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer bg-white/90 backdrop-blur-md border-2 border-gray-100 hover:border-amber-300 animate-scale-in overflow-hidden"
          style={{ animationDelay: `${idx * 0.05}s` }}
        >
          <div
            className="h-2 bg-gradient-to-r from-amber-400 to-orange-500 group-hover:h-3 transition-all duration-300"
          ></div>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-14 h-14 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"
              >
                {model.logo}
              </div>
              <Badge className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border-amber-200 text-xs">
                {model.provider}
              </Badge>
            </div>
            <CardTitle className="text-lg font-bold text-gray-900 mb-2">
              {model.name}
            </CardTitle>
            <p className="text-xs text-gray-600 leading-relaxed">
              {model.description}
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500 font-medium">
                Pricing
              </span>
              <Badge
                variant="outline"
                className="text-xs bg-green-50 border-green-200 text-green-700"
              >
                {model.pricing}
              </Badge>
            </div>
            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white hover:shadow-lg transition-all duration-300 text-sm group-hover:scale-105"
            >
              <Wand2 className="w-4 h-4 mr-2" />
              Try {model.name}
              <ExternalLink className="w-3 h-3 ml-2" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>

    {/* <div className="mt-12 text-center">
      <Card className="bg-gradient-to-r from-amber-500 to-orange-600 border-0 p-8 text-white max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold mb-3">
          🚀 AI is Transforming Development
        </h3>
        <p className="text-amber-100 mb-6">
          Modern developers use AI to write code faster, debug smarter, and
          build better products. Stay ahead of the curve with cutting-edge
          AI tools.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Badge className="bg-white/20 text-white text-sm px-4 py-2">
            ⚡ 10x Faster Coding
          </Badge>
          <Badge className="bg-white/20 text-white text-sm px-4 py-2">
            🧠 Intelligent Suggestions
          </Badge>
          <Badge className="bg-white/20 text-white text-sm px-4 py-2">
            🐛 Auto Bug Detection
          </Badge>
        </div>
      </Card>
    </div> */}
    <div className="mt-12 text-center">
  <Card 
    className="bg-gradient-to-r from-amber-500 to-orange-600 border-0 p-8 text-white max-w-3xl mx-auto transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
  >
    <h3 className="text-2xl font-bold mb-3 transform transition-all duration-300 hover:scale-105">
      🚀 AI is Transforming Development
    </h3>
    <p className="text-amber-100 mb-6 transition-opacity duration-300 hover:opacity-90">
      Modern developers use AI to write code faster, debug smarter, and build better products. Stay ahead of the curve with cutting-edge AI tools.
    </p>
    <div className="flex flex-wrap justify-center gap-3">
      <Badge 
        className="bg-white/20 text-white text-sm px-4 py-2 transform transition-all duration-300 hover:scale-110 hover:bg-white/30"
      >
        ⚡ 10x Faster Coding
      </Badge>
      <Badge 
        className="bg-white/20 text-white text-sm px-4 py-2 transform transition-all duration-300 hover:scale-110 hover:bg-white/30"
      >
        🧠 Intelligent Suggestions
      </Badge>
      <Badge 
        className="bg-white/20 text-white text-sm px-4 py-2 transform transition-all duration-300 hover:scale-110 hover:bg-white/30"
      >
        🐛 Auto Bug Detection
      </Badge>
    </div>
    
    {/* Floating particles */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-2 left-2 w-3 h-3 bg-white/20 rounded-full opacity-60 animate-ping" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-1/3 right-4 w-2 h-2 bg-white/30 rounded-full opacity-40 animate-ping" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-4 left-1/3 w-4 h-4 bg-white/40 rounded-full opacity-30 animate-ping" style={{ animationDelay: '1s' }}></div>
    </div>
  </Card>
</div>
  </div>
</section>


{/* ------------------- TESTIMONIALS WITH PROPER HOVER ANIMATIONS ------------------- */}
<section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
  <div className="container mx-auto max-w-7xl">
    <div className="text-center mb-10 animate-slide-up">
      <Badge className="mb-4 bg-amber-100 text-amber-700 border-amber-200 px-4 py-2 text-base">
        Success Stories
      </Badge>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 px-4">
        What Developers Are Saying
      </h2>
      <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
        Why grads say this course gave them real job offers, freelance
        confidence, and the tools to build anything.
      </p>
    </div>
    
    {/* Enhanced Testimonials Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
      {[
        {
          text: "The fullstack project workflow made so much sense: I launched my own SaaS on Vercel and had my first freelance client in 4 weeks.",
          name: "Lucas Nguyen",
          role: "Freelance Fullstack Developer",
          avatar: "👨‍💻",
          company: "Self-employed",
          rating: 5,
          color: "from-amber-500 to-orange-600"
        },
        {
          text: "Never thought I'd get comfortable with both React and Node, but the step-by-step labs finally helped me pass technical interviews at Amazon and Microsoft.",
          name: "Priya S.",
          role: "Frontend Engineer, Microsoft",
          avatar: "👩‍💻", 
          company: "Microsoft",
          rating: 5,
          color: "from-orange-500 to-red-600"
        },
        {
          text: "I went from zero coding to shipping a secure, tested app that actually worked. The DevOps and deployment modules teach what schools never do.",
          name: "Alex Rivera",
          role: "Junior DevOps Engineer, Vercel",
          avatar: "🛠️",
          company: "Vercel", 
          rating: 5,
          color: "from-red-500 to-pink-600"
        },
      ].map((testimonial, index) => (
        <Card 
          key={index} 
          className="group relative overflow-hidden bg-white/90 backdrop-blur-md border-2 border-gray-100 hover:border-amber-300 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 hover:scale-105 animate-slide-up cursor-pointer"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Gradient overlay that appears on hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
          
          {/* Floating elements */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
            <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs">
              ⭐ Verified Graduate
            </Badge>
          </div>

          <CardContent className="p-6 relative z-10">
            {/* Quote icon with animation */}
            <div className="mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <Quote className="w-8 h-8 text-amber-500 group-hover:text-amber-600" />
            </div>
            
            {/* Testimonial text */}
            <p className="text-sm text-gray-700 mb-6 italic leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
              "{testimonial.text}"
            </p>
            
            {/* Star rating */}
            <div className="flex gap-1 mb-4 justify-center">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star 
                  key={i} 
                  className="w-4 h-4 text-yellow-400 fill-current transform group-hover:scale-125 transition-transform duration-300" 
                  style={{ transitionDelay: `${i * 0.05}s` }}
                />
              ))}
            </div>
            
            {/* Profile section */}
            <div className="flex items-center gap-3 group-hover:gap-4 transition-all duration-300">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.color} flex items-center justify-center text-2xl shadow-lg group-hover:shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                {testimonial.avatar}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-base group-hover:text-amber-700 transition-colors duration-300">
                  {testimonial.name}
                </h4>
                <p className="text-orange-700 text-sm group-hover:text-orange-800 transition-colors duration-300">
                  {testimonial.role}
                </p>
                <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                  {testimonial.company}
                </p>
              </div>
            </div>
            
            {/* Animated bottom border */}
            <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${testimonial.color} w-0 group-hover:w-full transition-all duration-500 ease-out`}></div>
          </CardContent>
        </Card>
      ))}
    </div>

    {/* Main Featured Testimonial - Same as before but with enhanced animations */}
    <div className="max-w-4xl mx-auto">
      <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 shadow-xl animate-scale-in hover:shadow-2xl hover:scale-105 transition-all duration-500">
        <CardContent className="p-8 sm:p-12">
          <Quote className="w-12 h-12 text-amber-500 mb-6 animate-float" />
          {[
            {
              text: "The fullstack project workflow made so much sense: I launched my own SaaS on Vercel and had my first freelance client in 4 weeks.",
              name: "Lucas Nguyen",
              role: "Freelance Fullstack Developer",
              avatar: "👨‍💻",
            },
            {
              text: "Never thought I'd get comfortable with both React and Node, but the step-by-step labs finally helped me pass technical interviews at Amazon and Microsoft.",
              name: "Priya S.",
              role: "Frontend Engineer, Microsoft",
              avatar: "👩‍💻",
            },
            {
              text: "I went from zero coding to shipping a secure, tested app that actually worked. The DevOps and deployment modules teach what schools never do.",
              name: "Alex Rivera",
              role: "Junior DevOps Engineer, Vercel",
              avatar: "🛠️",
            },
          ][activeTestimonial] && (
            <div className="animate-fade-in">
              <p className="text-lg sm:text-xl text-gray-700 mb-6 italic leading-relaxed">
                "
                {
                  [
                    {
                      text: "The fullstack project workflow made so much sense: I launched my own SaaS on Vercel and had my first freelance client in 4 weeks.",
                    },
                    {
                      text: "Never thought I'd get comfortable with both React and Node, but the step-by-step labs finally helped me pass technical interviews at Amazon and Microsoft.",
                    },
                    {
                      text: "I went from zero coding to shipping a secure, tested app that actually worked. The DevOps and deployment modules teach what schools never do.",
                    },
                  ][activeTestimonial].text
                }
                "
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-amber-400 to-orange-600 flex items-center justify-center text-2xl sm:text-3xl drop-shadow animate-float">
                  {
                    [
                      { avatar: "👨‍💻" },
                      { avatar: "👩‍💻" },
                      { avatar: "🛠️" },
                    ][activeTestimonial].avatar
                  }
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">
                    {
                      [
                        { name: "Lucas Nguyen" },
                        { name: "Priya S." },
                        { name: "Alex Rivera" },
                      ][activeTestimonial].name
                    }
                  </h4>
                  <p className="text-orange-700 text-sm">
                    {
                      [
                        { role: "Freelance Fullstack Developer" },
                        { role: "Frontend Engineer, Microsoft" },
                        { role: "Junior DevOps Engineer, Vercel" },
                      ][activeTestimonial].role
                    }
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-center gap-2 mt-10">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonial(idx)}
                className={`h-3 rounded-full transition-all duration-500 hover:scale-125 ${
                  activeTestimonial === idx
                    ? "bg-amber-500 w-8 shadow-lg"
                    : "bg-gray-300 w-3 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</section>

{/* ------------------- ENHANCED CTA SECTION WITH PROPER ANIMATIONS ------------------- */}
<section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
  <div className="container mx-auto max-w-6xl">
    
    {/* Main CTA Card with Advanced Animations */}
    <Card className="relative overflow-hidden bg-gradient-to-br from-white/90 to-amber-50/80 backdrop-blur-md p-8 sm:p-12 rounded-3xl border-2 border-amber-200/60 shadow-2xl animate-slide-up mb-12 group hover:shadow-3xl hover:-translate-y-4 hover:scale-105 transition-all duration-700">
      
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-400/20 to-red-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000 delay-200"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-400 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-orange-500 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-red-400 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '1s' }}></div>
      </div>

      <CardHeader className="text-center relative z-10">
        {/* Animated icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-3xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
              <Rocket className="w-10 h-10 text-white group-hover:animate-bounce" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
          </div>
        </div>

        <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-amber-800 to-orange-800 bg-clip-text text-transparent mb-6 group-hover:from-amber-600 group-hover:to-orange-600 transition-all duration-500">
          Build What You Imagine. Get Hired. Stay Current.
        </CardTitle>
        
        <CardDescription className="text-lg sm:text-xl text-gray-600 mb-8 group-hover:text-gray-700 transition-colors duration-300 max-w-3xl mx-auto">
          Join the project-driven, modern curriculum. Lifetime syllabus updates for all graduates. 
          Preview free labs or start your journey in tech today!
        </CardDescription>
      </CardHeader>

      <CardContent className="relative z-10">
        {/* CTA Buttons with enhanced animations */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link to="/contact" className="w-full sm:w-auto group/btn">
            <Button
              size="lg"
              className="w-full sm:w-auto relative overflow-hidden bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110 px-10 py-6 text-xl font-semibold rounded-2xl group-hover/btn:animate-pulse"
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000"></div>
              
              <span className="relative flex items-center">
                Enroll Now
                <Rocket className="ml-3 h-6 w-6 group-hover/btn:translate-x-2 group-hover/btn:rotate-12 transition-all duration-300" />
              </span>
            </Button>
          </Link>
          
          <Button
            size="lg"
            variant="outline"
            onClick={() => handleDownload("WebDev Free Preview")}
            className="w-full sm:w-auto relative overflow-hidden border-3 border-amber-400 text-amber-700 hover:bg-amber-50 hover:border-amber-500 px-10 py-6 text-xl font-semibold rounded-2xl transition-all duration-500 hover:scale-110 hover:shadow-xl group/trial"
          >
            <span className="relative flex items-center">
              Free Trial
              <Play className="ml-3 h-6 w-6 group-hover/trial:translate-x-2 group-hover/trial:scale-125 transition-all duration-300" />
            </span>
          </Button>
        </div>

        {/* Feature badges with stagger animation */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-amber-700">
          {[
            { icon: CheckCheck, text: "Job interview prep guarantee" },
            { icon: CheckCheck, text: "Lifetime access & updates" },
            { icon: CheckCheck, text: "Certificate included" }
          ].map((feature, idx) => (
            <span 
              key={idx}
              className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-full backdrop-blur-sm border border-amber-200/60 hover:bg-white/80 hover:scale-105 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <feature.icon className="w-4 h-4 text-green-600" />
              <span className="font-medium">{feature.text}</span>
            </span>
          ))}
        </div>
      </CardContent>

      {/* Animated border gradient */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"></div>
    </Card>

    {/* Success Metrics Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        {
          icon: Code,
          title: "Real Projects Built",
          value: "15+",
          description: "Fullstack apps you'll ship",
          color: "from-amber-500 to-orange-600",
          delay: "0s"
        },
        {
          icon: Users,
          title: "Success Rate", 
          value: "91%",
          description: "Got job offers within 6 months",
          color: "from-orange-500 to-red-600",
          delay: "0.1s"
        },
        {
          icon: Trophy,
          title: "Average Salary",
          value: "$125K",
          description: "First year developer salary", 
          color: "from-red-500 to-pink-600",
          delay: "0.2s"
        },
        {
          icon: Star,
          title: "Student Rating",
          value: "4.92/5",
          description: "Based on 2,400+ reviews",
          color: "from-yellow-500 to-orange-600", 
          delay: "0.3s"
        }
      ].map((metric, idx) => (
        <Card 
          key={idx}
          className="group relative overflow-hidden bg-white/90 backdrop-blur-md border-2 border-gray-100 hover:border-amber-300 transition-all duration-500 hover:shadow-2xl hover:-translate-y-4 hover:scale-110 animate-slide-up cursor-pointer rounded-2xl"
          style={{ animationDelay: metric.delay }}
        >
          {/* Gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
          
          {/* Floating number effect */}
          <div className="absolute top-2 right-2 text-6xl font-black text-gray-100 group-hover:text-amber-100 transition-colors duration-500 select-none">
            {idx + 1}
          </div>

          <CardContent className="pt-8 p-6 text-center relative z-10">
            {/* Icon with enhanced animation */}
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${metric.color} p-4 mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 mx-auto shadow-xl group-hover:shadow-2xl`}>
              <metric.icon className="w-full h-full text-white" />
            </div>
            
            {/* Animated counter */}
            <div className="text-3xl font-black text-gray-900 mb-2 group-hover:text-4xl group-hover:scale-110 transition-all duration-300">
              {metric.value}
            </div>
            
            <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-amber-700 transition-colors duration-300">
              {metric.title}
            </h3>
            
            <p className="text-sm text-amber-800 group-hover:text-amber-900 transition-colors duration-300">
              {metric.description}
            </p>

            {/* Progress bar animation */}
            <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className={`h-full bg-gradient-to-r ${metric.color} w-0 group-hover:w-full transition-all duration-1000 ease-out`}></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>
   
    <section className="py-10 sm:py-16 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto max-w-4xl">
            <div className="text-center animate-slide-up">
            <div className="inline-block mb-6">
                <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-4 relative">
                Share This With Friends!
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
                </h3>
            </div>
            
            <p className="text-gray-600 mb-8 text-base sm:text-lg max-w-2xl mx-auto">
                Know anyone who dreams of building real web apps or working at top
                tech companies? Let them know.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
                {/* Twitter Button */}
                <Button
                onClick={() => handleShare("twitter")}
                className="group relative overflow-hidden bg-white border-2 border-gray-200 text-gray-700 hover:text-white hover:border-amber-400 px-6 py-3 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2"
                >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-x-0 group-hover:scale-x-100 origin-left"></div>
                
                <div className="relative z-10 flex items-center">
                    <Twitter className="w-5 h-5 mr-3 transition-all duration-500 group-hover:scale-125 group-hover:rotate-[360deg] group-hover:text-white" />
                    <span className="font-medium transition-all duration-300">Twitter</span>
                </div>
                
                {/* Sparkle effect */}
                <div className="absolute top-1 right-1 w-2 h-2 bg-amber-300 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-ping"></div>
                </Button>

                {/* LinkedIn Button */}
                <Button
                onClick={() => handleShare("linkedin")}
                className="group relative overflow-hidden bg-white border-2 border-gray-200 text-gray-700 hover:text-white hover:border-amber-400 px-6 py-3 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2"
                >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-y-0 group-hover:scale-y-100 origin-bottom"></div>
                
                <div className="relative z-10 flex items-center">
                    <Linkedin className="w-5 h-5 mr-3 transition-all duration-500 group-hover:scale-125 group-hover:rotate-[-360deg] group-hover:text-white" />
                    <span className="font-medium transition-all duration-300">LinkedIn</span>
                </div>
                
                {/* Sparkle effect */}
                <div className="absolute top-1 left-1 w-2 h-2 bg-orange-300 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-ping"></div>
                </Button>

                {/* Facebook Button */}
                <Button
                onClick={() => handleShare("facebook")}
                className="group relative overflow-hidden bg-white border-2 border-gray-200 text-gray-700 hover:text-white hover:border-amber-400 px-6 py-3 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2"
                >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-all duration-500 transform rotate-45 scale-0 group-hover:scale-150 group-hover:rotate-0"></div>
                
                <div className="relative z-10 flex items-center">
                    <Share2 className="w-5 h-5 mr-3 transition-all duration-500 group-hover:scale-125 group-hover:rotate-[180deg] group-hover:text-white" />
                    <span className="font-medium transition-all duration-300">Facebook</span>
                </div>
                
                {/* Sparkle effect */}
                <div className="absolute bottom-1 right-1 w-2 h-2 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-ping"></div>
                </Button>
            </div>

            {/* Decorative elements */}
            <div className="mt-8 flex justify-center space-x-2">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse delay-75"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-150"></div>
            </div>
            </div>
        </div>
        </section>

      {/* ---------------------- FAQ SECTION ----------------------- */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10 animate-slide-up">
            <Badge className="mb-4 bg-amber-100 text-amber-700 border-amber-200 px-4 py-2 text-base">
              FAQ
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 px-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg text-gray-600 px-4">
              Your roadmap to launching a web career with confidence.
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                question: "Do I need experience to start this course?",
                answer:
                  "No prior experience needed! The curriculum guides you from your first HTML tag to building, deploying, and debugging production apps.",
              },
              {
                question: "Which stack will I learn?",
                answer:
                  "You'll master the 'industry standard' full-stack: React (frontend), Node.js/Express (backend), PostgreSQL/MongoDB (databases), and modern DevOps tools.",
              },
              {
                question: "How does this help me get hired?",
                answer:
                  "We teach the skills assessed in real-life interviews: building, deploying, debugging, REST, SQL, testing, and working with product teams.",
              },
              {
                question: "Is the curriculum up to date?",
                answer:
                  "Yes. You get lifetime access and updates: the course follows latest React patterns, Node/TypeScript, trending frameworks, and cloud tools.",
              },
              {
                question: "How long will it take?",
                answer:
                  "Typical reach-job-ready timeline: 3–6 months for beginners (10–15 hrs/week). Pre-made transition tracks are available for career-changers!",
              },
              {
                question: "Do we get projects and support?",
                answer:
                  "Yes! Build real portfolio projects, get answers in the community, and gain resume/portfolio review if desired.",
              },
            ].map((faq, idx) => (
              <Card
                key={idx}
                className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 hover:border-amber-200 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 flex items-start">
                    <span className="text-amber-600 mr-2">Q:</span>
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 ml-6">
                    <span className="text-amber-600 mr-2">A:</span>
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------- METRICS ----------------------- */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-10 animate-slide-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 px-4">
              Real Career Results
            </h2>
            <p className="text-base sm:text-lg text-gray-600 px-4">
              Proof this curriculum bridges the gap from learning to hired.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                value: "7,800+",
                label: "Developers Trained",
                color: "from-amber-500 to-orange-500",
              },
              {
                icon: Trophy,
                value: "91%",
                label: "Got Tech Offers",
                color: "from-orange-500 to-red-500",
              },
              {
                icon: Star,
                value: "4.92/5",
                label: "Average Rating",
                color: "from-yellow-500 to-orange-500",
              },
              {
                icon: Briefcase,
                value: "86%",
                label: "Working in Webdev",
                color: "from-red-500 to-pink-500",
              },
            ].map((stat, idx) => (
              <Card
                key={idx}
                className={`group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-2 border-gray-100 animate-slide-up stagger-${
                  idx + 1
                }`}
              >
                <CardContent className="pt-6 p-6 text-center">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${stat.color} p-4 mb-4 group-hover:scale-110 transition-transform mx-auto shadow-lg`}
                  >
                    <stat.icon className="w-full h-full text-white" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WebDev_Course;
