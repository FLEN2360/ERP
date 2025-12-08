'use client';

import { Controller, useForm } from 'react-hook-form';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { arktypeResolver } from '@hookform/resolvers/arktype';
import { type } from 'arktype';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';

const LoginFormSchema = type({
  username: 'string > 0',
  password: 'string > 0',
});
type LoginFormSchema = typeof LoginFormSchema.infer;

export function LoginForm() {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const form = useForm<LoginFormSchema>({
    resolver: arktypeResolver(LoginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  }); ;

  const handleSumbit = async (value: LoginFormSchema) => {
    const { data, error } = await authClient.signIn.username(value);

    if (error) {
      form.setError('username', { message: error.message });
      form.setError('password', { message: error.message });
      return;
    }

    localStorage.setItem('token', data.token);
    router.push('/');
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    void form.handleSubmit(handleSumbit)(event);
  };

  return (
    <form id="login-form" onSubmit={onSubmit} className="p-1">
      <FieldGroup>
        <FieldSet>
          <FieldLegend className="font-bold">本機登入</FieldLegend>
          <FieldDescription className="text-2xl">
            使用本機帳號登入 ERP 系統
          </FieldDescription>
          <FieldGroup>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-bold"
                  >
                    使用者名稱
                  </FieldLabel>
                  <Input
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    type="text"
                    placeholder="使用者名稱"
                    autoComplete="username webauthn"
                    {...field}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-bold"
                  >
                    密碼
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      type={isPasswordVisible ? 'text' : 'password'}
                      placeholder="密碼"
                      autoComplete="current-password webauthn"
                      {...field}
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton onClick={() => { setIsPasswordVisible(!isPasswordVisible); }}>
                        {isPasswordVisible ? <EyeIcon /> : <EyeOffIcon />}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </FieldSet>
        <Field>
          <Button type="submit" form="login-form">
            登入
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
