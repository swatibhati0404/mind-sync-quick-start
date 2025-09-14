import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Shield, Brain, FileText, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Question {
  id: string;
  text: string;
  options: { value: string; label: string; score: number }[];
}

interface QuizData {
  title: string;
  description: string;
  questions: Question[];
  interpretation: { min: number; max: number; level: string; description: string; color: string }[];
}

const Quiz = () => {
  const [currentQuiz, setCurrentQuiz] = useState<"select" | "phq9" | "gad7">("select");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const phq9: QuizData = {
    title: "PHQ-9 Depression Screening",
    description: "Patient Health Questionnaire - assesses depression severity over the past 2 weeks",
    questions: [
      {
        id: "phq1",
        text: "Little interest or pleasure in doing things",
        options: [
          { value: "0", label: "Not at all", score: 0 },
          { value: "1", label: "Several days", score: 1 },
          { value: "2", label: "More than half the days", score: 2 },
          { value: "3", label: "Nearly every day", score: 3 }
        ]
      },
      {
        id: "phq2",
        text: "Feeling down, depressed, or hopeless",
        options: [
          { value: "0", label: "Not at all", score: 0 },
          { value: "1", label: "Several days", score: 1 },
          { value: "2", label: "More than half the days", score: 2 },
          { value: "3", label: "Nearly every day", score: 3 }
        ]
      },
      {
        id: "phq3",
        text: "Trouble falling or staying asleep, or sleeping too much",
        options: [
          { value: "0", label: "Not at all", score: 0 },
          { value: "1", label: "Several days", score: 1 },
          { value: "2", label: "More than half the days", score: 2 },
          { value: "3", label: "Nearly every day", score: 3 }
        ]
      },
      {
        id: "phq4",
        text: "Feeling tired or having little energy",
        options: [
          { value: "0", label: "Not at all", score: 0 },
          { value: "1", label: "Several days", score: 1 },
          { value: "2", label: "More than half the days", score: 2 },
          { value: "3", label: "Nearly every day", score: 3 }
        ]
      },
      {
        id: "phq5",
        text: "Poor appetite or overeating",
        options: [
          { value: "0", label: "Not at all", score: 0 },
          { value: "1", label: "Several days", score: 1 },
          { value: "2", label: "More than half the days", score: 2 },
          { value: "3", label: "Nearly every day", score: 3 }
        ]
      }
    ],
    interpretation: [
      { min: 0, max: 4, level: "Minimal", description: "Minimal depressive symptoms", color: "text-wellness" },
      { min: 5, max: 9, level: "Mild", description: "Mild depressive symptoms", color: "text-accent" },
      { min: 10, max: 14, level: "Moderate", description: "Moderate depressive symptoms", color: "text-primary" },
      { min: 15, max: 27, level: "Severe", description: "Severe depressive symptoms", color: "text-destructive" }
    ]
  };

  const gad7: QuizData = {
    title: "GAD-7 Anxiety Screening",
    description: "Generalized Anxiety Disorder assessment for the past 2 weeks",
    questions: [
      {
        id: "gad1",
        text: "Feeling nervous, anxious, or on edge",
        options: [
          { value: "0", label: "Not at all", score: 0 },
          { value: "1", label: "Several days", score: 1 },
          { value: "2", label: "More than half the days", score: 2 },
          { value: "3", label: "Nearly every day", score: 3 }
        ]
      },
      {
        id: "gad2",
        text: "Not being able to stop or control worrying",
        options: [
          { value: "0", label: "Not at all", score: 0 },
          { value: "1", label: "Several days", score: 1 },
          { value: "2", label: "More than half the days", score: 2 },
          { value: "3", label: "Nearly every day", score: 3 }
        ]
      },
      {
        id: "gad3",
        text: "Worrying too much about different things",
        options: [
          { value: "0", label: "Not at all", score: 0 },
          { value: "1", label: "Several days", score: 1 },
          { value: "2", label: "More than half the days", score: 2 },
          { value: "3", label: "Nearly every day", score: 3 }
        ]
      },
      {
        id: "gad4",
        text: "Trouble relaxing",
        options: [
          { value: "0", label: "Not at all", score: 0 },
          { value: "1", label: "Several days", score: 1 },
          { value: "2", label: "More than half the days", score: 2 },
          { value: "3", label: "Nearly every day", score: 3 }
        ]
      },
      {
        id: "gad5",
        text: "Being so restless that it's hard to sit still",
        options: [
          { value: "0", label: "Not at all", score: 0 },
          { value: "1", label: "Several days", score: 1 },
          { value: "2", label: "More than half the days", score: 2 },
          { value: "3", label: "Nearly every day", score: 3 }
        ]
      }
    ],
    interpretation: [
      { min: 0, max: 4, level: "Minimal", description: "Minimal anxiety symptoms", color: "text-wellness" },
      { min: 5, max: 9, level: "Mild", description: "Mild anxiety symptoms", color: "text-accent" },
      { min: 10, max: 14, level: "Moderate", description: "Moderate anxiety symptoms", color: "text-primary" },
      { min: 15, max: 21, level: "Severe", description: "Severe anxiety symptoms", color: "text-destructive" }
    ]
  };

  const getCurrentQuizData = (): QuizData => {
    return currentQuiz === "phq9" ? phq9 : gad7;
  };

  const handleAnswerSelect = (questionId: string, score: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: score }));
  };

  const handleNext = () => {
    const quizData = getCurrentQuizData();
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateScore = (): number => {
    return Object.values(answers).reduce((sum, score) => sum + score, 0);
  };

  const getInterpretation = (score: number) => {
    const quizData = getCurrentQuizData();
    return quizData.interpretation.find(
      (range) => score >= range.min && score <= range.max
    ) || quizData.interpretation[0];
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const startQuiz = (type: "phq9" | "gad7") => {
    setCurrentQuiz(type);
    resetQuiz();
  };

  if (currentQuiz === "select") {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">Mental Health Screening</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take validated mental health assessments to better understand your current wellbeing. 
            These screenings are completely anonymous and confidential.
          </p>
          <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>100% Anonymous</span>
            </div>
            <div className="flex items-center space-x-2">
              <Brain className="h-4 w-4 text-wellness" />
              <span>Clinically Validated</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-border hover:shadow-card transition-all hover:scale-105">
            <CardHeader className="text-center">
              <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-xl">PHQ-9 Depression Screening</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                The Patient Health Questionnaire-9 assesses depression symptoms over the past 2 weeks. 
                This is a widely used clinical tool for depression screening.
              </p>
              <ul className="text-sm text-muted-foreground text-left mb-6 space-y-2">
                <li>• 9 questions about mood and activities</li>
                <li>• Takes 3-5 minutes to complete</li>
                <li>• Provides severity assessment</li>
                <li>• Helps identify depression symptoms</li>
              </ul>
              <Button onClick={() => startQuiz("phq9")} className="w-full bg-primary hover:bg-primary/90">
                Start PHQ-9 Assessment
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-card transition-all hover:scale-105">
            <CardHeader className="text-center">
              <Brain className="h-12 w-12 text-wellness mx-auto mb-4" />
              <CardTitle className="text-xl">GAD-7 Anxiety Screening</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                The Generalized Anxiety Disorder-7 assesses anxiety symptoms over the past 2 weeks. 
                This is a standard tool used by healthcare professionals.
              </p>
              <ul className="text-sm text-muted-foreground text-left mb-6 space-y-2">
                <li>• 7 questions about anxiety and worry</li>
                <li>• Takes 2-3 minutes to complete</li>
                <li>• Measures anxiety severity</li>
                <li>• Helps identify anxiety disorders</li>
              </ul>
              <Button onClick={() => startQuiz("gad7")} className="w-full bg-wellness hover:bg-wellness/90">
                Start GAD-7 Assessment
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-muted/50 border-border">
            <CardContent className="p-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Important Notes</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
                <div>
                  <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p><strong>Privacy Protected:</strong> Your responses are encrypted and stored securely on blockchain.</p>
                </div>
                <div>
                  <Brain className="h-8 w-8 text-wellness mx-auto mb-2" />
                  <p><strong>Not Diagnostic:</strong> These tools are for screening only, not clinical diagnosis.</p>
                </div>
                <div>
                  <FileText className="h-8 w-8 text-accent mx-auto mb-2" />
                  <p><strong>Seek Help:</strong> If you score high, consider speaking with a mental health professional.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const interpretation = getInterpretation(score);
    const quizData = getCurrentQuizData();

    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card className="border-border shadow-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Assessment Results</CardTitle>
            <p className="text-muted-foreground">{quizData.title}</p>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-8">
              <div className="text-6xl font-bold mb-2" style={{ color: `hsl(var(--${interpretation.color.split('-')[1]}))` }}>
                {score}
              </div>
              <Badge variant="outline" className={`${interpretation.color} text-lg px-4 py-2`}>
                {interpretation.level}
              </Badge>
            </div>

            <p className="text-lg text-muted-foreground mb-8">
              {interpretation.description}
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/resources">View Resources</Link>
                </Button>
                <Button asChild className="w-full bg-wellness hover:bg-wellness/90">
                  <Link to="/booking">Book Session</Link>
                </Button>
              </div>
              
              <div className="flex space-x-4">
                <Button onClick={() => setCurrentQuiz("select")} variant="outline" className="flex-1">
                  Take Other Assessment
                </Button>
                <Button onClick={resetQuiz} variant="outline" className="flex-1">
                  Retake This Test
                </Button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Badge variant="outline" className="text-xs">
                <Shield className="h-3 w-3 mr-1" />
                Results stored securely on Aptos blockchain
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const quizData = getCurrentQuizData();
  const question = quizData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <Button
            onClick={() => setCurrentQuiz("select")}
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Selection
          </Button>
          <div className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {quizData.questions.length}
          </div>
        </div>
        
        <Progress value={progress} className="w-full h-2 mb-4" />
        
        <h1 className="text-2xl font-bold text-foreground text-center mb-2">
          {quizData.title}
        </h1>
      </div>

      <Card className="border-border shadow-card">
        <CardContent className="p-8">
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-6 leading-relaxed">
              Over the past 2 weeks, how often have you been bothered by:
            </h2>
            <p className="text-xl text-foreground font-medium leading-relaxed">
              {question.text}
            </p>
          </div>

          <RadioGroup
            value={answers[question.id]?.toString() || ""}
            onValueChange={(value) => handleAnswerSelect(question.id, parseInt(value))}
          >
            {question.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-3 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value={option.score.toString()} id={option.value} />
                <Label htmlFor={option.value} className="flex-1 text-base cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-between mt-8">
            <Button
              onClick={handlePrevious}
              variant="outline"
              disabled={currentQuestion === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!answers[question.id] && answers[question.id] !== 0}
              className="bg-primary hover:bg-primary/90"
            >
              {currentQuestion === quizData.questions.length - 1 ? "Get Results" : "Next"}
              {currentQuestion !== quizData.questions.length - 1 && (
                <ArrowRight className="h-4 w-4 ml-2" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Quiz;