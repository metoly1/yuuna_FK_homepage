from PIL import Image
import os

def convert_avif_to_png(input_folder, output_folder):
    # 入力フォルダ内のすべてのファイルを取得
    files = os.listdir(input_folder)
    
    for file in files:
        if file.endswith('.avif'):
            avif_path = os.path.join(input_folder, file)
            # AVIF ファイルを開いて PNG に変換
            img = Image.open(avif_path).convert('RGB')
            # 出力ファイルパスを生成
            png_path = os.path.join(output_folder, os.path.splitext(file)[0] + '.png')
            # PNG として保存
            img.save(png_path, 'PNG')
            print(f'{file} を変換しました。')

# 入力フォルダと出力フォルダを指定
input_folder = r'H:\usb\down3\AyKay\おしおき!拘束矯正プログラム'
output_folder = r'H:\usb\down3\AyKay\おしおき!拘束矯正プログラム\converted_images'

# 出力フォルダが存在しない場合は作成
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

# 変換を実行
convert_avif_to_png(input_folder, output_folder)
