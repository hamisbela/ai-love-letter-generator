import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Coffee, Sparkles, Heart, Star, Copy, Check } from 'lucide-react';
import { genAI } from '@/lib/gemini';

export default function Home() {
  const [description, setDescription] = useState('');
  const [letter, setLetter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generateLetter = async () => {
    if (!description.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      if (!genAI) {
        throw new Error("API key not configured. Please add your Gemini API key to continue.");
      }
      
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Generate a romantic and heartfelt love letter (between 100-500 words) based on this context: ${description}. The letter should be genuine, emotional, and personal, expressing deep feelings of love and affection. Make it poetic and touching while maintaining authenticity. Avoid clichés and generic expressions.`;
      
      const result = await model.generateContent(prompt);
      setLetter(result.response.text());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while generating the love letter');
      setLetter('');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 py-4">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-rose-600 text-transparent bg-clip-text leading-tight">
            Free AI Love Letter Generator ✨
          </h1>
          <p className="text-xl text-gray-600">
            Express your love beautifully with AI-crafted love letters! 💝
          </p>
        </div>
        
        <div className="gradient-border mb-8">
          <div className="p-8">
            <div className="space-y-6">
              <Textarea
                placeholder="✍️ Describe your feelings, your relationship, and what makes your love special..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[120px] text-lg border-2 focus:border-pink-400"
              />
              
              <Button 
                onClick={generateLetter}
                disabled={loading || !description.trim()}
                className="w-full text-lg py-6 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700"
              >
                {loading ? (
                  <>
                    <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                    Creating Magic...
                  </>
                ) : (
                  <>
                    <Heart className="mr-2 h-5 w-5" />
                    Generate Love Letter ✨
                  </>
                )}
              </Button>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>

        {letter && (
          <Card className="p-6 mb-12 hover:shadow-lg transition-all duration-300 border-2 hover:border-pink-200">
            <div className="flex justify-between items-start gap-4 mb-4">
              <h3 className="text-xl font-semibold">Your Love Letter</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="flex items-center gap-2 hover:bg-pink-50"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy</span>
                  </>
                )}
              </Button>
            </div>
            <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {letter}
            </p>
          </Card>
        )}

        <Card className="p-8 bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200 mb-16">
          <div className="text-center space-y-4">
            <Coffee className="h-12 w-12 mx-auto text-pink-500" />
            <h2 className="text-2xl font-bold">Support Our Work ❤️</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Help us maintain and improve our AI tools by supporting our API & hosting costs. 
              Your contribution helps keep this tool free for everyone! 🙏
            </p>
            <a
              href="https://roihacks.gumroad.com/coffee"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button size="lg" className="text-lg px-8 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700">
                <Coffee className="mr-2 h-5 w-5" />
                Buy Us a Coffee ☕
              </Button>
            </a>
          </div>
        </Card>

        <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl shadow-xl p-8 mb-16">
          <article className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-rose-600 text-transparent bg-clip-text">
              Free AI Love Letter Generator: Express Your Love Beautifully ⚡
            </h2>
            
            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed">
                Our Free AI Love Letter Generator is the perfect tool for crafting beautiful, heartfelt expressions of love. 
                Using advanced artificial intelligence, we help you create romantic, personalized love letters that 
                capture your deepest feelings and emotions.
              </p>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Star className="h-6 w-6 text-pink-500" />
                  The #1 AI Love Letter Generator 💝
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2">💌</span>
                    <span>Beautiful, personalized love letters for any occasion</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🤖</span>
                    <span>AI-powered technology for authentic expressions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">⚡</span>
                    <span>Generate romantic letters in seconds</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✨</span>
                    <span>Perfect blend of poetry and sincerity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">💎</span>
                    <span>Free to use with unlimited generations</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Heart className="h-6 w-6 text-pink-500" />
                  Why Choose Our AI Love Letter Generator? 💫
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our AI-powered love letter generator stands out by understanding the nuances of romantic expression,
                  ensuring your message is:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span>💝</span> Deeply personal and romantic
                  </li>
                  <li className="flex items-center gap-2">
                    <span>💫</span> Poetic and touching
                  </li>
                  <li className="flex items-center gap-2">
                    <span>🌟</span> Authentically emotional
                  </li>
                  <li className="flex items-center gap-2">
                    <span>💌</span> Beautifully crafted
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Perfect For Every Occasion 💕</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our AI love letter generator is perfect for:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li>• Valentine's Day messages</li>
                  <li>• Anniversary celebrations</li>
                  <li>• Long-distance relationships</li>
                  <li>• Wedding vows</li>
                  <li>• Romantic surprises</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Tips for Perfect Love Letters 💌</h3>
                <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                  <li>Share specific memories and moments</li>
                  <li>Express your deepest feelings</li>
                  <li>Be genuine and personal</li>
                  <li>Include your hopes for the future</li>
                  <li>Make it uniquely yours</li>
                </ol>
              </div>
            </div>
          </article>
        </div>

        <Card className="p-8 bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200 mb-16">
          <div className="text-center space-y-4">
            <Coffee className="h-12 w-12 mx-auto text-pink-500" />
            <h2 className="text-2xl font-bold">Love Our Free AI Love Letter Generator? Support Its Growth! 🚀</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Your support helps us maintain our AI infrastructure, improve the tool's capabilities,
              and keep it accessible to everyone. Every coffee counts! ☕
            </p>
            <div className="pt-2">
              <a
                href="https://roihacks.gumroad.com/coffee"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button size="lg" className="text-lg px-8 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700">
                  <Coffee className="mr-2 h-5 w-5" />
                  Buy Us a Coffee ☕
                </Button>
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}