interface NotifyOptions {
  customerName: string
  customerPhone: string
  location: string
  scheduledAt: string
  doctor: string
  areas: string[]
}

/**
 * 推送 Flex Message 到診所客服群組
 * 使用 LINE Messaging API Push
 */
export async function notifyStaff(options: NotifyOptions) {
  const config = useRuntimeConfig()
  const token = config.lineChannelAccessToken

  // 建立分店群組對應表
  const branchGroupMap: Record<string, string | undefined> = {
    '高雄院區': config.lineStaffGroupIdKaohsiung,
    '台北院區': config.lineStaffGroupIdTaipei,
    '台中院區': config.lineStaffGroupIdTaichung,
  }

  // 收集所有要發送的群組 ID
  const groupIds = [
    config.lineStaffGroupId,                    // 總群一定發
    branchGroupMap[options.location ?? ''],     // 對應分店群
  ]
    .map(s => (s || '').trim())
    .filter(Boolean)

  if (!token || groupIds.length === 0) {
    console.log('[LINE] Staff notification skipped: missing token or groupId')
    return
  }

  const now = new Date().toLocaleString('zh-TW', {
    timeZone: 'Asia/Taipei',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })

  const itemsContents = options.areas.map((area) => ({
    type: 'text' as const,
    text: `• picosure pro 諮詢-${area}`,
    size: 'sm' as const,
    color: '#555555',
    wrap: true,
  }))

  const flexMessage = {
    type: 'flex' as const,
    altText: `新預約：${options.customerName} - ${options.areas.join('、')}`,
    contents: {
      type: 'bubble',
      size: 'mega',
      header: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: '新預約通知',
            weight: 'bold',
            size: 'xl',
            color: '#ffffff',
            align: 'center',
          },
        ],
        backgroundColor: '#107a7f',
        paddingAll: '20px',
      },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          // 客戶資訊標題
          {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: '客戶資訊',
                size: 'sm',
                color: '#107a7f',
                weight: 'bold',
              },
              {
                type: 'separator',
                margin: 'sm',
                color: '#73c6cb',
              },
            ],
          },
          // 姓名
          makeRow('姓名', options.customerName),
          // 電話
          makeRow('電話', options.customerPhone),
          // 院區
          makeRow('院區', options.location),
          // 預約時間
          makeRow('時間', options.scheduledAt),
          // 醫師（只在有值時顯示）
          ...(options.doctor ? [makeRow('醫師', options.doctor)] : []),
          // 分隔
          {
            type: 'separator',
            margin: 'lg',
            color: '#73c6cb',
          },
          // 預約項目標題
          {
            type: 'text',
            text: '預約項目',
            size: 'sm',
            color: '#107a7f',
            weight: 'bold',
            margin: 'lg',
          },
          // 項目列表
          ...itemsContents,
        ],
        paddingAll: '20px',
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: `通知時間：${now}`,
            size: 'xs',
            color: '#aaaaaa',
            align: 'center',
          },
        ],
        paddingAll: '10px',
      },
    },
  }

  // 逐一發送到各群組
  const results = await Promise.allSettled(
    groupIds.map(async (groupId) => {
      try {
        await $fetch('https://api.line.me/v2/bot/message/push', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: {
            to: groupId,
            messages: [flexMessage],
          },
        })
        console.log(`[LINE] Staff notification sent to group: ${groupId}`)
      } catch (err: any) {
        console.error(`[LINE] Staff notification failed for ${groupId}:`, err.data || err.message)
        throw err
      }
    })
  )

  const successCount = results.filter(r => r.status === 'fulfilled').length
  console.log(`[LINE] Notification sent to ${successCount}/${groupIds.length} groups`)
}

/**
 * 客戶通知（暫不啟用，需要客戶 LINE userId）
 */
export async function notifyCustomer(_options: NotifyOptions) {
  // TODO: 需要從 LIFF 取得客戶 LINE userId 才能推送
  console.log('[LINE] Customer notification skipped: userId not available')
}

function makeRow(label: string, value: string) {
  return {
    type: 'box' as const,
    layout: 'horizontal' as const,
    contents: [
      {
        type: 'text' as const,
        text: label,
        size: 'sm' as const,
        color: '#999999',
        flex: 2,
      },
      {
        type: 'text' as const,
        text: value || '未提供',
        size: 'md' as const,
        weight: 'bold' as const,
        color: '#333333',
        flex: 5,
        wrap: true,
      },
    ],
    margin: 'lg' as const,
  }
}
