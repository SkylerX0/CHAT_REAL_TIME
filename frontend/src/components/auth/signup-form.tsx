import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {Card, CardContent,} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router";

// sử dụng zod để validate form trước khi backend nhận
const signUpSchema = z.object({
  firstname: z.string().min(1, "Vui lòng nhập tên"),
  lastname: z.string().min(1, "Vui lòng nhập họ"),
  username: z.string().min(3, "Tên người dùng phải có ít nhất 3 ký tự"),
  email: z.email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type SignUpFormValues = z.infer<typeof signUpSchema>; // dung type này để định nghĩa kiểu dữ liệu của form

export function SignUpForm({className, ...props}: React.ComponentProps<"div">) {
  const { signUp } = useAuthStore();
  const navigate = useNavigate();
  //register: hàm theo dõi input, handleSubmit: hàm xử lý submit form, errors: lỗi validate
  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema)
  });

  const onSubmit = async(data: SignUpFormValues)=> {
    const {firstname, lastname, username, email, password} = data;

    //gọi api đăng ký phía backend
    await signUp (username, password, email, firstname, lastname);

    //chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
    navigate("/signin");
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-border">
        {/* <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader> */}
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              
              {/* header - logo */}
              <div className="flex flex-col items-center text-center gap-2">
                <a href="/" className="mx-auto block w-fit text-center">
                  {/* <img src="" alt="logo" /> */}
                </a>

                <h2 className="text-lg font-semibold">Tạo tài khoản</h2>
                <p className="text-sm text-muted-foreground">
                  Chào mừng bạn! Hãy đăng ký để bắt đầu sử dụng dịch vụ.
                </p>
              </div>

              {/* ho va ten */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="lastname" className="block text-sm">
                    Họ
                  </Label>
                  <Input type="text" id="lastname" {...register("lastname")} />
                  {/* todo: lỗi nếu ko nhập họ */}
                  {errors.lastname && (
                    <p className="text-destructive text-sm">
                      {errors.lastname.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="firstname" className="block text-sm">
                    Tên
                  </Label>
                  <Input type="text" id="firstname" {...register("firstname")} />
                  {/* todo: lỗi nếu ko nhập tên */}
                  {errors.firstname && (
                    <p className="text-destructive text-sm">
                      {errors.firstname.message}
                    </p>
                  )}
                </div>
              </div>

              {/* userName */}
              <div className="flex flex-col gap-3">
                <Label htmlFor="username" className="block text-sm">
                  Tên người dùng
                </Label>
                <Input type="text" id="username" placeholder="layiz" {...register("username")} />
                {/* todo: lỗi nếu ko nhập tên */}
                {errors.username && (
                  <p className="text-destructive text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>
              
              {/* email */}
              <div className="flex flex-col gap-3">
                <Label htmlFor="email" className="block text-sm">
                  Email
                </Label>
                <Input type="email" id="email" placeholder="layiz@example.com" {...register("email")} />
                {/* todo: lỗi nếu ko nhập email */}
                {errors.email && (
                  <p className="text-destructive text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* password */}
              <div className="flex flex-col gap-3">
                <Label htmlFor="password" className="block text-sm">
                  Mật khẩu
                </Label>
                <Input type="password" id="password" {...register("password")} />
                {/* todo: lỗi nếu ko nhập mật khẩu */}
                {errors.password && (
                  <p className="text-destructive text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* nut dang ki */}

              <Button type="submit" className="w-full" disabled={isSubmitting}> Đăng ký </Button>

              <div className="text-center text-sm">
                Đã có tài khoản?{" "}
                <a href="/signin" className="text-primary hover:underline">
                  Đăng nhập
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="px-6 text-center text-xs text-balance text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        Bằng cách tiếp tục, bạn đồng ý với <a href="#">Điều khoản dịch vụ</a>{" "}
        và <a href="#">Chính sách bảo mật</a>.
      </div>
    </div>
  )
}
