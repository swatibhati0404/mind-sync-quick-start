import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Video, Headphones, Download, Globe, Search, Filter, Shield } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "pdf" | "video" | "audio";
  category: string;
  language: string;
  duration?: string;
  pages?: number;
  downloadUrl: string;
}

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");

  const resources: Resource[] = [
    {
      id: "1",
      title: "Stress Management Techniques for Students",
      description: "Practical strategies to manage academic stress, including time management, relaxation techniques, and healthy coping mechanisms.",
      type: "pdf",
      category: "stress",
      language: "english",
      pages: 24,
      downloadUrl: "#"
    },
    {
      id: "2",
      title: "Mindfulness Meditation for Anxiety",
      description: "Guided meditation sessions specifically designed to help manage anxiety and promote emotional regulation.",
      type: "audio",
      category: "anxiety",
      language: "english",
      duration: "25 mins",
      downloadUrl: "#"
    },
    {
      id: "3",
      title: "छात्रों के लिए मानसिक स्वास्थ्य गाइड",
      description: "A comprehensive guide to mental health for students in Hindi, covering common challenges and coping strategies.",
      type: "pdf",
      category: "general",
      language: "hindi",
      pages: 32,
      downloadUrl: "#"
    },
    {
      id: "4",
      title: "Cognitive Behavioral Techniques",
      description: "Learn CBT techniques to challenge negative thoughts and develop healthier thinking patterns.",
      type: "video",
      category: "depression",
      language: "english",
      duration: "18 mins",
      downloadUrl: "#"
    },
    {
      id: "5",
      title: "Sleep Hygiene and Mental Health",
      description: "Understanding the connection between sleep and mental health, with practical tips for better sleep.",
      type: "pdf",
      category: "wellness",
      language: "english",
      pages: 16,
      downloadUrl: "#"
    },
    {
      id: "6",
      title: "মানসিক চাপ মোকাবেলার কৌশল",
      description: "Stress management techniques explained in Bengali for regional students.",
      type: "audio",
      category: "stress",
      language: "bengali",
      duration: "20 mins",
      downloadUrl: "#"
    },
    {
      id: "7",
      title: "Building Resilience in Academic Life",
      description: "Develop psychological resilience to bounce back from academic setbacks and challenges.",
      type: "video",
      category: "wellness",
      language: "english",
      duration: "22 mins",
      downloadUrl: "#"
    },
    {
      id: "8",
      title: "Panic Attack Management Guide",
      description: "Emergency techniques and long-term strategies for managing panic attacks and severe anxiety episodes.",
      type: "pdf",
      category: "anxiety",
      language: "english",
      pages: 12,
      downloadUrl: "#"
    }
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "stress", label: "Stress Management" },
    { value: "anxiety", label: "Anxiety Support" },
    { value: "depression", label: "Depression Resources" },
    { value: "wellness", label: "General Wellness" },
    { value: "general", label: "Mental Health Education" }
  ];

  const languages = [
    { value: "all", label: "All Languages" },
    { value: "english", label: "English" },
    { value: "hindi", label: "हिंदी (Hindi)" },
    { value: "bengali", label: "বাংলা (Bengali)" }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-5 w-5" />;
      case "video":
        return <Video className="h-5 w-5" />;
      case "audio":
        return <Headphones className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "pdf":
        return "text-primary bg-primary/10";
      case "video":
        return "text-accent bg-accent/10";
      case "audio":
        return "text-wellness bg-wellness/10";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "stress":
        return "bg-primary/10 text-primary";
      case "anxiety":
        return "bg-wellness/10 text-wellness";
      case "depression":
        return "bg-accent/10 text-accent";
      case "wellness":
        return "bg-secondary/10 text-secondary";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    const matchesLanguage = selectedLanguage === "all" || resource.language === selectedLanguage;
    
    return matchesSearch && matchesCategory && matchesLanguage;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-foreground mb-4">Resource Library</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Access evidence-based mental health resources in multiple languages. All materials are 
          stored securely on IPFS and verified for quality and accuracy.
        </p>
        <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-primary" />
            <span>IPFS Hosted</span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4 text-wellness" />
            <span>Multilingual</span>
          </div>
          <div className="flex items-center space-x-2">
            <FileText className="h-4 w-4 text-accent" />
            <span>Evidence-Based</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-8 border-border">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium text-foreground mb-2 block">Search Resources</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="w-full md:w-48">
              <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-48">
              <label className="text-sm font-medium text-foreground mb-2 block">Language</label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((language) => (
                    <SelectItem key={language.value} value={language.value}>
                      {language.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {filteredResources.length} of {resources.length} resources
        </p>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="border-border hover:shadow-card transition-all hover:scale-105">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${getTypeColor(resource.type)}`}>
                  {getTypeIcon(resource.type)}
                </div>
                <Badge variant="outline" className={getCategoryColor(resource.category)}>
                  {resource.category}
                </Badge>
              </div>
              <CardTitle className="text-lg leading-tight">
                {resource.title}
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {resource.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <div className="flex items-center space-x-4">
                  <span className="capitalize">{resource.language}</span>
                  {resource.duration && (
                    <span>{resource.duration}</span>
                  )}
                  {resource.pages && (
                    <span>{resource.pages} pages</span>
                  )}
                </div>
              </div>
              
              <Button className="w-full" variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Access Resource
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No resources found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search terms or filters to find relevant resources.
          </p>
          <Button onClick={() => {
            setSearchTerm("");
            setSelectedCategory("all");
            setSelectedLanguage("all");
          }}>
            Clear Filters
          </Button>
        </div>
      )}

      {/* IPFS Info */}
      <div className="mt-12 text-center">
        <Card className="bg-muted/50 border-border">
          <CardContent className="p-8">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-4">Decentralized & Secure</h3>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              All resources are stored on IPFS (InterPlanetary File System) ensuring permanent availability, 
              censorship resistance, and distributed access. Content hashes are recorded on the Aptos blockchain 
              for verification and integrity.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Resources;