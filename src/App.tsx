import { useEffect, useRef, useState } from 'react';

import './App.css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Textarea } from './components/ui/textarea';
import { Input } from './components/ui/input';
import Nav from './components/ui/nav';
import axios from 'axios';
import { Button } from './components/ui/button';
import { Label } from './components/ui/label';

function App() {
  const textInputRef = useRef(null);
  const [company, setCompany] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState(null);

  const [companyError, setCompanyError] = useState(false);
  const [questionError, setQuestionError] = useState(false);
  const [submitted, setSubmitted] = useState(false)

  const handleButtonClick = async () => {
    const queryInput = textInputRef.current.value;
    console.log('Query:', queryInput);


    if (!queryInput) {
      setQuestionError(true);
      return;
    }

    setLoading(true);

    axios
      .get(`https://hire-chat-backend-500d6356f1a0.herokuapp.com/query/?prompt=${queryInput}&company=Gitlab`)
      .then((response) => {
        // Handle the response
        console.log(response.data);
        setResponse(response.data.result);
        setLoading(false);
        setSubmitted(true);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append('uploaded_file', file);

    axios
      .post(`https://hire-chat-backend-500d6356f1a0.herokuapp.com/upload/?company=${company}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCompanyChange = (event) => {
    setCompanyError(false)
    setCompany(event.target.value);
  };

  const handleQuestionChange = (event) => {
    setQuestionError(false)
  }

  const handleFileChange = async (event) => {
    setFile(event.target.files[0]);
  };

  const handleKeyDown = async (event) => {
    if (event.keyCode === 13) { // Check if the Enter key is pressed
      handleButtonClick(); // Call the handleButtonClick function
    }
  };

  useEffect(() => {
    document.body.addEventListener('keydown', handleKeyDown); // Add event listener when component mounts
    return () => {
      document.body.removeEventListener('keydown', handleKeyDown); // Remove event listener when component unmounts
    };
  }, []); // Empty dependency array ensures effect is only run once


  return (
    <>
      <div className="absolute top-0 left-0 right-0 h-8 bg-orange-500"></div>

      <main className="relative flex flex-col items-center justify-between mt-9 ">
        <div className="absolute  h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        <div className="z-10 px-5 text-center max-w-8xl w-full h-full items-center  text-sm flex flex-col gap-5">
          <div className="min-h-screen text-center max-w-8xl w-full items-center  text-sm flex flex-col gap-5">
            <Nav />

            <div className="flex flex-col gap-1 sm:gap-4 pt-14 sm:pt-32 items-center justify-center mt-9">
              <div>
                <h1 className="text-3xl font-medium sm:text-6xl">Hi, I'm Gitlab's AI </h1>
                <h1 className="text-3xl font-medium sm:text-6xl pb-1 animate-text-gradient bg-gradient-to-r from-zinc-900 via-zinc-500 to-zinc-500 bg-[150%_auto] bg-clip-text leading-tight text-transparent ">
                  Interview Process Assistant!
                </h1>
              </div>
              <p className="text-base max-w-prose sm:text-lg pt-5">
                I can help answer your questions about our hiring processes, working at Gitlab,
                company culture, values, onboarding and more!
              </p>
            </div>

            <div className="pt-2 md:max-w-3xl max-w-sm flex">
              <Tabs defaultValue="button" className="w-full">
                <TabsContent value="button">
                  <div className="flex flex-col space-y-4">
                    <div className="grid w-full gap-6 lg:grid-row-2">
                      <div className="flex flex-col space-y-2">
                        <div className="flex flex-col items-start space-y-1">
                          <Label htmlFor="input">Question</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              id="text-input"
                              name="text-input"
                              placeholder="Enter your question here"
                              className="flex-1 lg:min-w-[580px]"
                              ref={textInputRef}
                              onChange={handleQuestionChange}
                            />

                            <Button onClick={handleButtonClick}> {loading ? 'Sending...' : 'Send'}</Button>
                          </div>
                          {questionError && <p className="text-red-500 text-sm">Please enter a question</p>}
                        </div>
                      </div>
                      {submitted && (
                        <Textarea
                          className="flex w-3/3 rounded-md border border-input  bg-muted px-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[150px] py-2"
                          id="input"
                          value={response}
                          readOnly={true}
                        />
                      )}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="tailwind">
                  <div className="grid lg:min-w-[600px] max-w-sm items-center gap-1.5">
                    <Input id="picture" type="file" onChange={handleFileChange} onClick={uploadFile} />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <p className="text-xs md:text-sm pt-3"> ✨ Simply ask us any questions about the process to get started!</p>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
