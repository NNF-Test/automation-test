def bubble_sort(arr):
    n = len(arr)
    # 遍历所有数组元素
    for i in range(n):
        # Last i elements are already in place
        for j in range(0, n-i-1):
            # 遍历数组从 0 到 n-i-1
            # 交换如果发现元素大于下一个元素
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]

if __name__ == "__main__":
    # 测试代码
    arr = [64, 34, 25, 12, 22, 11, 90]
    print("原始数组:", arr)
    
    bubble_sort(arr)
    
    print("排序后的数组:")
    for i in range(len(arr)):
        print("%d" % arr[i], end=" ")
    print()
