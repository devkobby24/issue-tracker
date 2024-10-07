'use client';
import { Button, Callout, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';

interface IssueForm {
  title: string;
  description: string;
}


const NewIssuePage = () => {
  const router = useRouter()
  const { register, control, handleSubmit } = useForm<IssueForm>();
  // console.log(register('title'));
  const [error, setError] = useState('');


  return (
    <div className='space-y-5 max-w-xl'>
      
      {error && <Callout.Root>
        <Callout.Icon>
          <AiOutlineInfoCircle />
        </Callout.Icon>
        <Callout.Text color="red">
          {error}
        </Callout.Text>
      </Callout.Root>}
      


      <form className='space-y-3' onSubmit={handleSubmit(async (data) => {
        try {
          await axios.post('/api/issues', data);
          router.push('/issues')
        } catch (error) {
          setError('An error occurred')
        }
      })}>
        <TextField.Root placeholder='Create an Issue' {...register('title')} />
        <Controller
          name="description"
          control={control}
          render={({ field }) =>
            <SimpleMDE placeholder="Description" {...field} />
          }
        />

        <Button>Submit New Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage