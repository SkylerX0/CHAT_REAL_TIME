import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router";


// sử dụng zod để validate form trước khi backend nhận
const signInSchema = z.object({
    username: z.string().min(3, "Tên người dùng phải có ít nhất 3 ký tự"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type SignInFormValues = z.infer<typeof signInSchema>; // dung type này để định nghĩa kiểu dữ liệu của form

export function SignInForm({ className, ...props }: React.ComponentProps<"div">) {
    const {signIn} = useAuthStore();
    const negative = useNavigate();

    //register: hàm theo dõi input, handleSubmit: hàm xử lý submit form, errors: lỗi validate
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignInFormValues>({
        resolver: zodResolver(signInSchema)
    });

    const onSubmit = async (data: SignInFormValues) => {
        //gọi api đăng nhập phía backend
        const { username, password } = data;
        await signIn(username, password);
        //chuyển hướng đến trang chính sau khi đăng nhập thành công
        negative("/");
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

                                <h2 className="text-lg font-semibold">Chào mừng bạn!</h2>
                                <p className="text-sm text-muted-foreground">
                                    Đăng nhập để tiếp tục sử dụng dịch vụ.
                                </p>
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

                            {/* nut dang nhap */}

                            <Button type="submit" className="w-full" disabled={isSubmitting}> Đăng nhập </Button>

                            <div className="text-center text-sm">
                                Chưa có tài khoản?{" "}
                                <a href="/signup" className="text-primary hover:underline">
                                    Đăng ký
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