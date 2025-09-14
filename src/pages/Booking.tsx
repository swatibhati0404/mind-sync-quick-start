import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Clock, Shield, Lock, CheckCircle, User, FileText } from "lucide-react";

interface BookingData {
  preferredName?: string;
  contactMethod: "anonymous" | "email" | "phone";
  contactValue?: string;
  preferredDate: string;
  preferredTime: string;
  sessionType: string;
  concerns: string;
  urgency: string;
  previousTherapy: boolean;
  consentGiven: boolean;
}

const Booking = () => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    contactMethod: "anonymous",
    preferredDate: "",
    preferredTime: "",
    sessionType: "",
    concerns: "",
    urgency: "routine",
    previousTherapy: false,
    consentGiven: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sessionTypes = [
    { value: "individual", label: "Individual Therapy", description: "One-on-one session with a licensed therapist" },
    { value: "group", label: "Group Therapy", description: "Small group session with peers facing similar challenges" },
    { value: "crisis", label: "Crisis Support", description: "Immediate support for urgent mental health concerns" },
    { value: "consultation", label: "Initial Consultation", description: "Assessment session to determine best treatment approach" }
  ];

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"
  ];

  const urgencyLevels = [
    { value: "routine", label: "Routine", description: "Standard scheduling (within 1-2 weeks)" },
    { value: "priority", label: "Priority", description: "Faster scheduling (within 3-5 days)" },
    { value: "urgent", label: "Urgent", description: "Same day or next day scheduling" }
  ];

  const handleInputChange = (field: keyof BookingData, value: any) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handlePrevious = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    // Simulate blockchain submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 2000);
  };

  const generateBlockchainHash = () => {
    return `0x${Math.random().toString(16).slice(2, 18)}...${Math.random().toString(16).slice(2, 10)}`;
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card className="border-border shadow-card">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <CheckCircle className="h-16 w-16 text-wellness mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-foreground mb-2">Booking Confirmed</h1>
              <p className="text-muted-foreground">
                Your session request has been securely submitted and encrypted.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Blockchain Hash:</span>
                  <Badge variant="outline" className="font-mono text-xs">
                    {generateBlockchainHash()}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-left">
                  <span className="text-muted-foreground">Session Type:</span>
                  <p className="font-medium text-foreground capitalize">{bookingData.sessionType}</p>
                </div>
                <div className="text-left">
                  <span className="text-muted-foreground">Priority:</span>
                  <p className="font-medium text-foreground capitalize">{bookingData.urgency}</p>
                </div>
                <div className="text-left">
                  <span className="text-muted-foreground">Preferred Date:</span>
                  <p className="font-medium text-foreground">{bookingData.preferredDate}</p>
                </div>
                <div className="text-left">
                  <span className="text-muted-foreground">Preferred Time:</span>
                  <p className="font-medium text-foreground">{bookingData.preferredTime}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-wellness/10 border border-wellness/20 rounded-lg p-4">
                <h3 className="font-semibold text-wellness mb-2">What Happens Next?</h3>
                <ul className="text-sm text-muted-foreground text-left space-y-2">
                  <li>• Our team will review your request within 24 hours</li>
                  <li>• You'll receive confirmation via your chosen contact method</li>
                  <li>• Session details will be shared securely before your appointment</li>
                  <li>• All data remains encrypted and private throughout the process</li>
                </ul>
              </div>

              <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Shield className="h-3 w-3 text-primary" />
                  <span>Privacy Protected</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Lock className="h-3 w-3 text-wellness" />
                  <span>Blockchain Secured</span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <Button className="w-full" onClick={() => window.location.href = "/"}>
                Return to Home
              </Button>
              <Button variant="outline" className="w-full" onClick={() => {
                setStep(1);
                setIsSubmitted(false);
                setBookingData({
                  contactMethod: "anonymous",
                  preferredDate: "",
                  preferredTime: "",
                  sessionType: "",
                  concerns: "",
                  urgency: "routine",
                  previousTherapy: false,
                  consentGiven: false,
                });
              }}>
                Book Another Session
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">Book Confidential Session</h1>
        <p className="text-lg text-muted-foreground">
          Schedule a private session with our trained mental health professionals. 
          Your privacy is protected by blockchain technology.
        </p>
        <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-primary" />
            <span>Fully Confidential</span>
          </div>
          <div className="flex items-center space-x-2">
            <Lock className="h-4 w-4 text-wellness" />
            <span>Encrypted Storage</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Step {step} of 3</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      <Card className="border-border shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {step === 1 && <><User className="h-5 w-5" /> <span>Contact Preferences</span></>}
            {step === 2 && <><Calendar className="h-5 w-5" /> <span>Session Details</span></>}
            {step === 3 && <><FileText className="h-5 w-5" /> <span>Review & Submit</span></>}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <>
              <div>
                <Label className="text-base font-medium">How would you like us to contact you?</Label>
                <div className="mt-3 space-y-3">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="anonymous"
                      name="contact"
                      checked={bookingData.contactMethod === "anonymous"}
                      onChange={() => handleInputChange("contactMethod", "anonymous")}
                      className="w-4 h-4 text-primary"
                    />
                    <Label htmlFor="anonymous" className="flex-1">
                      <div>
                        <p className="font-medium">Anonymous (Recommended)</p>
                        <p className="text-sm text-muted-foreground">We'll assign you a secure session ID</p>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="email"
                      name="contact"
                      checked={bookingData.contactMethod === "email"}
                      onChange={() => handleInputChange("contactMethod", "email")}
                      className="w-4 h-4 text-primary"
                    />
                    <Label htmlFor="email" className="flex-1">
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">Receive confirmation via encrypted email</p>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="phone"
                      name="contact"
                      checked={bookingData.contactMethod === "phone"}
                      onChange={() => handleInputChange("contactMethod", "phone")}
                      className="w-4 h-4 text-primary"
                    />
                    <Label htmlFor="phone" className="flex-1">
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">Receive SMS confirmation</p>
                      </div>
                    </Label>
                  </div>
                </div>
              </div>

              {bookingData.contactMethod !== "anonymous" && (
                <div>
                  <Label htmlFor="contactValue">
                    {bookingData.contactMethod === "email" ? "Email Address" : "Phone Number"}
                  </Label>
                  <Input
                    id="contactValue"
                    type={bookingData.contactMethod === "email" ? "email" : "tel"}
                    placeholder={bookingData.contactMethod === "email" ? "your@email.com" : "+1 (555) 123-4567"}
                    value={bookingData.contactValue || ""}
                    onChange={(e) => handleInputChange("contactValue", e.target.value)}
                    className="mt-2"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="preferredName">Preferred Name (Optional)</Label>
                <Input
                  id="preferredName"
                  placeholder="What should we call you during the session?"
                  value={bookingData.preferredName || ""}
                  onChange={(e) => handleInputChange("preferredName", e.target.value)}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This can be any name you're comfortable with, including a pseudonym
                </p>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <Label className="text-base font-medium">Session Type</Label>
                <div className="mt-3 space-y-3">
                  {sessionTypes.map((type) => (
                    <div key={type.value} className="flex items-start space-x-3">
                      <input
                        type="radio"
                        id={type.value}
                        name="sessionType"
                        checked={bookingData.sessionType === type.value}
                        onChange={() => handleInputChange("sessionType", type.value)}
                        className="w-4 h-4 text-primary mt-1"
                      />
                      <Label htmlFor={type.value} className="flex-1">
                        <div>
                          <p className="font-medium">{type.label}</p>
                          <p className="text-sm text-muted-foreground">{type.description}</p>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="preferredDate">Preferred Date</Label>
                  <Input
                    id="preferredDate"
                    type="date"
                    value={bookingData.preferredDate}
                    onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                    className="mt-2"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div>
                  <Label htmlFor="preferredTime">Preferred Time</Label>
                  <Select value={bookingData.preferredTime} onValueChange={(value) => handleInputChange("preferredTime", value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">Urgency Level</Label>
                <div className="mt-3 space-y-3">
                  {urgencyLevels.map((level) => (
                    <div key={level.value} className="flex items-start space-x-3">
                      <input
                        type="radio"
                        id={level.value}
                        name="urgency"
                        checked={bookingData.urgency === level.value}
                        onChange={() => handleInputChange("urgency", level.value)}
                        className="w-4 h-4 text-primary mt-1"
                      />
                      <Label htmlFor={level.value} className="flex-1">
                        <div>
                          <p className="font-medium">{level.label}</p>
                          <p className="text-sm text-muted-foreground">{level.description}</p>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="concerns">What brings you to seek support? (Optional)</Label>
                <Textarea
                  id="concerns"
                  placeholder="Share any specific concerns or areas you'd like to focus on..."
                  value={bookingData.concerns}
                  onChange={(e) => handleInputChange("concerns", e.target.value)}
                  className="mt-2"
                  rows={4}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This helps us match you with the most suitable therapist
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="previousTherapy"
                  checked={bookingData.previousTherapy}
                  onCheckedChange={(checked) => handleInputChange("previousTherapy", checked)}
                />
                <Label htmlFor="previousTherapy" className="text-sm">
                  I have had therapy or counseling before
                </Label>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-foreground">Review Your Booking</h3>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Contact Method:</span>
                    <p className="font-medium text-foreground capitalize">{bookingData.contactMethod}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Session Type:</span>
                    <p className="font-medium text-foreground capitalize">{bookingData.sessionType}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Preferred Date:</span>
                    <p className="font-medium text-foreground">{bookingData.preferredDate}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Preferred Time:</span>
                    <p className="font-medium text-foreground">{bookingData.preferredTime}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Priority:</span>
                    <p className="font-medium text-foreground capitalize">{bookingData.urgency}</p>
                  </div>
                  {bookingData.preferredName && (
                    <div>
                      <span className="text-muted-foreground">Preferred Name:</span>
                      <p className="font-medium text-foreground">{bookingData.preferredName}</p>
                    </div>
                  )}
                </div>
                
                {bookingData.concerns && (
                  <div>
                    <span className="text-muted-foreground text-sm">Concerns:</span>
                    <p className="text-sm text-foreground mt-1">{bookingData.concerns}</p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="consent"
                    checked={bookingData.consentGiven}
                    onCheckedChange={(checked) => handleInputChange("consentGiven", checked)}
                  />
                  <Label htmlFor="consent" className="text-sm leading-relaxed">
                    I understand that this session will be conducted by licensed mental health professionals, 
                    and I consent to the collection and secure storage of my data as outlined in the privacy policy.
                  </Label>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <h4 className="font-semibold text-primary mb-2">Privacy & Security</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Your booking data is encrypted using AES-256 encryption</li>
                    <li>• Session records are stored on Aptos blockchain for immutable privacy</li>
                    <li>• Only you and your assigned therapist have access to session details</li>
                    <li>• All data can be deleted upon request at any time</li>
                  </ul>
                </div>
              </div>
            </>
          )}

          <div className="flex justify-between pt-4">
            {step > 1 && (
              <Button onClick={handlePrevious} variant="outline">
                Previous
              </Button>
            )}
            
            <div className="ml-auto">
              {step < 3 ? (
                <Button 
                  onClick={handleNext}
                  disabled={
                    (step === 1 && bookingData.contactMethod !== "anonymous" && !bookingData.contactValue) ||
                    (step === 2 && (!bookingData.sessionType || !bookingData.preferredDate || !bookingData.preferredTime))
                  }
                  className="bg-primary hover:bg-primary/90"
                >
                  Next
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  disabled={!bookingData.consentGiven}
                  className="bg-wellness hover:bg-wellness/90"
                >
                  Submit Booking
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Booking;